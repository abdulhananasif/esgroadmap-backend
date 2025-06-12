import { Request, Response } from "express";
import axios from "axios";
import { prisma } from "../../server.js";

interface PaddleCheckoutResponse {
  success: boolean;
  response?: {
    url: string;
  };
  error?:{
    code: number;
    message: string
  }
}

const VENDOR_ID = process.env.PADDLE_VENDOR_ID as string;
const AUTH_CODE = process.env.PADDLE_API_KEY as string;
const PRODUCT_ID = process.env.PADDLE_PRODUCT_ID as string;

export const createCheckout = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log("🚀 ~ createCheckout ~ user:", user);
    if (!user) {
      throw { message: "user not exist" };
    }
    const payload = new URLSearchParams({
      vendor_id: VENDOR_ID,
      vendor_auth_code: AUTH_CODE,
      product_id: PRODUCT_ID,
      customer_email: email,
      passthrough: JSON.stringify({ userId: user.id }),
    });
    console.log("🚀 ~ createCheckout ~ payload:", payload);

    const response = await axios.post<PaddleCheckoutResponse>(
      "https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link",
      payload
    );

    if (!response.data.success) {
      console.error("Paddle Error:", response.data.error);
      res.status(500).json({ error: "Paddle failed to generate a pay link" });
      return;
    }
    console.log("🚀 ~ createCheckout ~ response:", response);
    const payLink = response?.data?.response?.url;

    if (!payLink) {
      console.error("Paddle response:", response.data);
      res.status(500).json({ error: "Paddle pay link missing" });
      return;
    }

    res.json({ url: payLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout creation failed" });
  }
};