// models/transactionModel.ts
import mongoose, { Schema, Document } from "mongoose";
import { ITransaction } from "../interface/paymentInterface";

export interface TransactionDocument extends ITransaction, Document {}

const transactionSchema = new Schema<TransactionDocument>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: String, required: true }, 
    paymentId: { type: String },
    paymentLinkId: { type: String, required: true },
    razorpayPaymentId: { type: String, default: null },
    status: { type: String, enum: ["created", "paid", "cancelled", "failed"], default: "created" },
    paymentFlag: { type: String, enum: ["success", "failure", "pending"], default: "pending" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model<TransactionDocument>("Transaction", transactionSchema);
