const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js")

const listingSchema = new Schema({                    // defined Schema of Listing

  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url:String,
    filename:String,
  },

  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// putted as middleware works when called
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } })
    console.log("review deleted grouped to this listing")
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
