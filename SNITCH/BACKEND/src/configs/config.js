import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error(`MONGO_URI is not defind in environment variables`);
}

if (!process.env.JWT_SECRET) {
  throw new Error(`JWT_SECRET is not defind in environment variables`);
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error(`GOOGLE_CLIENT_ID is not defind in environment variables`);
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    `GOOGLE_CLIENT_SECRET is not defind in environment variables`,
  );
}

if (!process.env.NODE_ENV) {
  throw new Error(`NODE_ENV is not defind in environment variables`);
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "IMAGEKIT_PRIVATE_KEY is not defind in environment variables",
  );
}

if (!process.env.RAZORPAY_TEST_API_KEY) {
  throw new Error(
    "RAZORPAY_TEST_API_KEY is not defind in envrionment variables",
  );
}
if (!process.env.RAZORPAY_TEST_SECRET_KEY) {
  throw new Error(
    "RAZORPAY_TEST_SECRET_KEY is not defind in envrionment variables",
  );
}

const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  RAZORPAY_TEST_API_KEY: process.env.RAZORPAY_TEST_API_KEY,
  RAZORPAY_TEST_SECRET_KEY: process.env.RAZORPAY_TEST_SECRET_KEY,
};

export default CONFIG;
