import mongoose, { Schema, Document } from "mongoose";
import { IBook } from "../interface/bookInterdace";

export interface IBookDocument extends IBook, Document {}

const BookSchema = new Schema<IBookDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
});

export const BookModel = mongoose.model<IBookDocument>("Book", BookSchema);
