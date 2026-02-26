const listing = require("../models/listing.js");

module.exports.index = (async (req, res) => {
    const allListings = await listing.find({});
    res.render("./listings/index.ejs", { allListings });
})

module.exports.new = (req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.show = (async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } },)
        .populate("owner");
    // No data available without populate method only Obj Id

    if (!listings) {
        req.flash("error", "Requested listing doesn't exist");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listings })
})

module.exports.add = (async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "Listing Added Successfully");
    res.redirect("./listings");
})

module.exports.edit = (async (req, res) => {
    let { id } = req.params;
    let newId = await listing.findById(id);
    if (!newId) {
        req.flash("error", "Requested listing doesn't exist");
        return res.redirect("/listings");
    }

    newImage=newId.image.url;
    newImage.replace("/upload","/upload/h_100,w_100");
    res.render("./listings/edit.ejs", { newId , newImage});
})

module.exports.update = (async (req, res) => {
    let { id } = req.params;
    let list = await listing.findByIdAndUpdate(id, { ...req.body.listing });

    if ( typeof req.file !== "undefined" ) {
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = { url, filename };
        await list.save();
    }

    req.flash("success", "Listing Updated Successfully");  // directly updating to js object means deconstructing 
    res.redirect("/listings");
})

module.exports.delete = (async (req, res) => {
    let { id } = req.params;
    let deleted = await listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success2", "Listing Deleted Successfully");
    res.redirect("/listings");
})