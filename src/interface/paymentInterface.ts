import { Types } from "mongoose";

export interface ITransaction {
  bookId: Types.ObjectId;
  userId: string;
  paymentId?: string;
  paymentLinkId: string;
  razorpayPaymentId?: string | null;
  status:string
  paymentFlag: "success" | "failure" | "pending";
  amount: number;
  currency: string;
  createdAt?: Date;
}