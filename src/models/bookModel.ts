import mongoose from 'mongoose'
import { Ibook } from '../interface/bookInterdace'

const bookSchema = new mongoose.Schema<Ibook>(
     {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    bookId: { type: String, required: true },
    availableCopies: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
})

export const bookModel = mongoose.model<Ibook>('book', bookSchema);