import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // Initialize item entry if not present
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Initialize size entry if not present
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    // Increment the quantity
    cartData[itemId][size] += 1;

    // Save the updated cart
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // Initialize item if not already in cart
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update quantity
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, getUserCart, updateCart };
