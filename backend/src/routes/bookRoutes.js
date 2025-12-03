import express from "express";
import Book from "../models/Book.js";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
    try {
        const {title, caption, rating, image} = req.body;

        if (!title || !caption || !rating || !image) {
            return res.status(400).json({message: "Veuillez fournir tous"});
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;

        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
            // user: req.user._id,
        });
        await newBook.save();

        res.status(201).json(newBook)

    } catch (error) {
        console.log("Erreur dans la création du livre", error);
        res.status(500).json({ message: error.message});
    }
})

export default router;