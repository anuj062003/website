import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"; // Make sure this path is correct

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        );

        const newProduct = new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            images: imagesUrl,
            date: Date.now()
        });

        await newProduct.save();

        res.status(201).json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// Function to list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })


    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }
};

// Function to fetch single product details
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body.id;

        const product = await productModel.findById(productId);
        res.json({ success: false, product });
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }
};

export default { listProducts, addProduct, removeProduct, singleProduct };
