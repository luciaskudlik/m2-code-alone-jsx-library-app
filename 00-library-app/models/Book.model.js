const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CREATE THE SCHEMA
const bookSchema = new Schema(
  {
    title: String,
    description: String,
    rating: Number,
    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

//CREATE THE MODEL
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
