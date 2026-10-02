const Listing = require("../models/listing");

// module.exports.index = async(req,res)=>{
//   const allListings =  await Listing.find({});
//   res.render("listings/index", { allListings });
// };

module.exports.index = async (req, res) => {

    const { category } = req.query;

    let allListings;

    if (category) {
        allListings = await Listing.find({
            category: category
        });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index", {
        allListings
    });
};

// module.exports.new =  (req, res) => {
//     console.log(req.user);
//     if (!req.isAuthenticated()) {
//         req.flash("error", "You must be logged in to create a listing.");
//         return res.redirect("/login");
//      }
//     res.render("listings/new.ejs");
// };

module.exports.renderNewForm = (req, res) => {
   
    console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews", 
        populate:{
            path:"author",
        },
    })
    .populate("owner");


    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);

    return res.render("listings/show", { listing });
};

// module.exports.createListing = async (req, res, next) => {
//      let url = req.file.path;
//     let filename = req.file.filename;
   

//         // req.body.listing.image = {
//         //     filename: "listingimage",
//         //     url: req.body.listing.image,
//         // };
//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;
//         newListing.image = (url, filename);
          
//         await newListing.save();
//         req.flash("success", "New Listing Created!")
//         res.redirect("/listings");
//     };


module.exports.createListing = async (req, res, next) => {
   let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.image = {
        url: url,
        filename: filename
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


    module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
    req.flash("error", "you are not the owner of this listing!");
    return res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/w_300,h_250,c_fill");
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
        let { id } = req.params;
        req.body.listing.image = {
            filename: "listingimage",
            url: req.body.listing.image,
        };

        let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
        if(typeof req.file !== "undefined"){
     let url = req.file.path;
    let filename = req.file.filename;
    listing.image =  {
        url: url,
        filename: filename
    };
    await listing.save();
}
        req.flash("success", "Listing Updated!")

        res.redirect(`/listings/${id}`);
    };

    module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
   

    let deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    console.log("deleted listing");
    req.flash("success", "Listing Deleted!");
    return res.redirect("/listings");
};