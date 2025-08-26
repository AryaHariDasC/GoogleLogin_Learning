 import Razorpay from "razorpay";
 import { TransactionModel } from "../models/paymentTransactionModel";
// import { BookModel } from "../models/bookModel";


// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export const createPaymentLink = async (
//   amount: number,
//   bookName: string,
//   customer: { name: string; email: string; contact: string }
// ) => {
//   const options = {
//     amount: amount * 100, // paise
//     currency: "INR",
//     description: `Payment for ${bookName}`,
//     customer
//   };

//   return await razorpay.paymentLink.create(options);
// };

// services/paymentService.ts



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createBookPayment = async (book: any, user: any) => {
  const options = {
    amount: book.price * 100,
    currency: "INR",
    description: `Payment for ${book.title}`,
    customer: {
      name: user.name,
      email: user.email,
      contact: user.contact,
    },
    callback_url: "http://localhost:3000/api/payment/callback",
  };

  const paymentLink = await razorpay.paymentLink.create(options);


  await TransactionModel.create({
    bookId: book._id,
    userId: user._id || user.id || "guest",
    paymentLinkId: paymentLink.id,
    status: "created",
    paymentFlag: "pending",
    amount: book.price,
    currency: "INR",
  });

  return paymentLink;
};
