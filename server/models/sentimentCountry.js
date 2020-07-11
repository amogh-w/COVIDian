const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentCountrySchema = new Schema(
  {
    country: String,
    city: String,
    anger: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    worry: Number,
  },
  { collection: "sentiments_country" }
);

module.exports = mongoose.model("sentimentCountry", sentimentCountrySchema);
