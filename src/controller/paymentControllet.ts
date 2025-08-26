import { Request } from "express";
import { statusCode } from "../hepler/statusCode";
import { BookModel } from "../models/bookModel";
import { TransactionModel } from "../models/paymentTransactionModel";
import {
  createBookService,
  getAllBooksService,
} from "../service/BuyBookService";
import { createBookPayment } from "../service/paymentService";
import { ControllerResponse } from "../interface/userInterface";

export const createBookController = async (
  req: Request
): Promise<ControllerResponse> => {
  try {
    const result = await createBookService(req.body);
    return {
      statusCode: statusCode.CREATED,
      message: "Book created successfully",
      data: result,
    };
  } catch (error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: "Error creating book",
      data: error,
    };
  }
};

export const getAllBooksController = async (): Promise<ControllerResponse> => {
  try {
    const result = await getAllBooksService();
    return {
      statusCode: statusCode.OK,
      message: "Books fetched successfully",
      data: result,
    };
  } catch (error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: "Error fetching books",
      data: error,
    };
  }
};

export const buyBookController = async (req: Request) => {
  try {
    const { bookId, name, email, contact } = req.body;

    const book = await BookModel.findById(bookId);
    if (!book) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        message: "Book not found",
        data: null,
      };
    }

    const paymentLink = await createBookPayment(book, {
      name,
      email,
      contact,
    });

    return {
      statusCode: statusCode.OK,
      message: "Payment link created. Open it in browser to pay.",
      data: {
        paymentUrl: paymentLink.short_url,
        status: paymentLink.status,
      },
    };
  } catch (error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: "Error creating payment link",
      data: error.message,
    };
  }
};


export const paymentCallbackController = async (req: Request) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_payment_link_id,
      razorpay_payment_link_status,
      razorpay_payment_link_reference_id,
      razorpay_signature,
    } = req.query;

    const transaction = await TransactionModel.findOne({
      paymentLinkId: razorpay_payment_link_id,
    });

    if (!transaction) {
      return {
        statusCode: statusCode.NOT_FOUND,
        message: "Transaction not found",
        data: null,
      };
    }

    // 2. Update transaction fields
    transaction.razorpayPaymentId = razorpay_payment_id as string;
    transaction.status = razorpay_payment_link_status as string;
    transaction.paymentFlag =
      razorpay_payment_link_status === "paid"
        ? "success"
        : razorpay_payment_link_status === "cancelled"
        ? "failure"
        : "failure";

    await transaction.save();

    // 3. Return based on payment status
    if (razorpay_payment_link_status === "paid") {
      return {
        statusCode: statusCode.OK,
        message: " Payment successful",
        data: transaction,
      };
    } else if (razorpay_payment_link_status === "cancelled") {
      return {
        statusCode: statusCode.BAD_REQUEST,
        message: " Payment was cancelled",
        data: transaction,
      };
    } else {
      return {
        statusCode: statusCode.BAD_REQUEST,
        message: "Payment failed",
        data: transaction,
      };
    }
  } catch (error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: "Error in payment callback",
      data: error.message,
    };
  }
};
