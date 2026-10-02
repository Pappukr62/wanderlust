
const express = require("express");

const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");

const {
    isLoggedIn,
    isOwner,
    validateListing
} = require("../midleware");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudeConfig.js");

const upload = multer({ storage });


router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);


// SEARCH ROUTE
router.get("/search", wrapAsync(async (req, res) => {
    let { search } = req.query;

    let allListings = await Listing.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", { allListings });
}));


    // new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);

router.get("/delete-null",wrapAsync( async (req, res) => {
    await Listing.deleteMany({ price: null });
    res.send("Deleted");
}));




// Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm)
);


module.exports = router;