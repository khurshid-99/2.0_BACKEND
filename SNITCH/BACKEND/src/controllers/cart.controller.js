import { stockOfVariant } from "../dow/product.dao.js";
import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

export async function addToCart(req, res) {
  const { productId, variantId } = req.params;
  const { quantity = 1 } = req.body;
  const user = req.user;

  console.log(quantity);
  const product = await ProductModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      message: "Product or Variant not found",
      success: false,
    });
  }

  const stock = await stockOfVariant(productId, variantId);

  const cart =
    (await CartModel.findOne({ user: user._id })) ||
    (await CartModel.create({
      user: user._id,
    }));

  const isProductAlreadyInCart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (isProductAlreadyInCart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId).quantity;

    if (quantityInCart + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left is stock, and you alredy have ${quantityInCart} items in your cart `,
        success: false,
      });

      await CartModel.findOneAndUpdate(
        {
          user: user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        {
          $inc: { "items.$.quantity": quantity },
        },
        {
          new: true,
        },
      );
    }
  }

  if (quantity > stock) {
    return res.status(400).json({
      messaage: `Only ${stock} items left is stock`,
      success: false,
    });
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await cart.save();

  return res.status(201).json({
    message: "Product added to cart successfully",
    success: true,
  });
}

export async function getCart(req, res) {
  const user = req.user;
  let cartItems = await CartModel.find({
    user: user._id,
  });

  if (!cartItems) {
    cartItems = await CartModel.create({ user: user._id });
  }
  return res.status(200).json({
    message: "Cart fetched successfully",
    success: true,
    cartItems,
  });
}
