import mongoose, {  Schema } from "mongoose";
//model for Book
const BookSchema= new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  publishDate: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
