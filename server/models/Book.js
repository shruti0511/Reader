const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    isFree: {
      type: Boolean,
      required: true,
    },
    price: {
        type: Number,
        default:0
    },
    publication_date: {
      type: Date,
    },
    image: {
      type: String,
    },
    imagePath: {
      type: String,
    },
    bookFile: {
      type: String,
      required: true,
    },
    bookFilePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
