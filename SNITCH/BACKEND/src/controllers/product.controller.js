import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import { uploadImages } from "../services/stroge.service.js";

export async function createProduct(req, res) {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const imageFile = req.files;
  const seller = req.user;

  // console.log(imageFile);
  // console.log(req.files);
  // console.log(description)

  if (!imageFile || imageFile.length === 0) {
    return res.status(400).json({
      message: "At least one image is required",
    });
  }

  const images = await Promise.all(
    imageFile.map(async (file) => {
      return await uploadImages({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const Product = await ProductModel.create({
    title,
    description,
    price: {
      currency: priceCurrency || "INR",
      amount: priceAmount,
    },
    images: images,
    seller: seller._id,
  });

  return res.status(201).json({
    message: "Product create successfully.",
    success: true,
    product: Product,
  });
}

export async function getSellerProduct(req, res) {
  const user = req.user;

  // console.log(user.id);

  try {
    const products = await ProductModel.find({
      seller: user.id,
    });

    // console.log(products);

    return res.status(200).json({
      message: "Get Seller Products",
      success: true,
      products,
    });
  } catch (error) {
    console.log(`Get Seller Product error : ${error}`);
    res.status(500).json({
      message: "Server error!",
    });
  }
}
