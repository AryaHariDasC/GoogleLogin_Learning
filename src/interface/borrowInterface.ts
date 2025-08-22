import {Types} from 'mongoose'


export interface Iborrow{
  _id: string,
  userId: Types.ObjectId,  
  bookId: Types.ObjectId,   
  issueDate: Date,
  dueDate: Date,
  returnDate?: Date,
  status: "issued" | "returned",
}