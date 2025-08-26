import { BookModel } from "../models/bookModel";
import { IBook } from "../interface/bookInterdace";

export const createBookService = async (data: IBook) => {
  return await BookModel.create(data);
};

export const getAllBooksService = async () => {
  return await BookModel.find();
};
