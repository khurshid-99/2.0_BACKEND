import CONFIG from "../configs/config.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: CONFIG.RAZORPAY_TEST_API_KEY,
  key_secret: CONFIG.RAZORPAY_TEST_SECRET_KEY,
});

export const createOrder = async ({ amount, currency = "INR" }) => {
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
  };

  const order = razorpay.orders.create(options);
  return order;
};
