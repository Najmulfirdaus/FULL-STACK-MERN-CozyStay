import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
    try {
        console.log("--- 1. Backend Received Request ---");
        
        // चेक करें कि क्या फाइल्स आई हैं
        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            console.log("Error: Files missing in request!");
            return res.status(400).json({ message: "All 3 images are required" });
        }
        
        console.log("--- 2. Starting Cloudinary Uploads ---");

        // एक-एक करके इमेज अपलोड करें
        let path1 = req.files.image1[0].path;
        let image1 = await uploadOnCloudinary(path1);
        
        let path2 = req.files.image2[0].path;
        let image2 = await uploadOnCloudinary(path2);
        
        let path3 = req.files.image3[0].path;
        let image3 = await uploadOnCloudinary(path3);

        // चेक करें कि Cloudinary ने URL दिया या null
        if (!image1 || !image2 || !image3) {
            console.log("Error: Cloudinary upload returned null!");
            return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        console.log("--- 3. Saving to Database ---");
        let { title, description, rent, city, landMark, category } = req.body;
        let host = req.userId;
console.log("Logged in user ID:", req.userId);
        let listing = await Listing.create({
            title, description, rent, city, landMark, category,
            image1, image2, image3, host
        });
        await User.findByIdAndUpdate(host, { 
            $push: { listing: listing._id } 
        });

        console.log("Success: Listing created!");
        return res.status(201).json(listing);

    } catch (error) {
       
        console.error("--- FATAL ERROR IN ADDLISTING ---", error);
        return res.status(500).json({ message: error.message });
    }
}
export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ createdAt: -1 });
        return res.status(200).json(listing);
    } catch (error) {
        return res.status(500).json({ message: `getListing error: ${error.message}` });
    }
}

export const findListing = async (req, res) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        return res.status(200).json(listing);
    } catch (error) {
        return res.status(500).json({ message: `findListing error: ${error.message}` });
    }
}

export const updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        let updateData = { ...req.body };

        // केवल तभी अपलोड करें अगर फाइल भेजी गई हो, ताकि पुरानी इमेज न हटे
        if (req.files?.image1) updateData.image1 = await uploadOnCloudinary(req.files.image1[0].path);
        if (req.files?.image2) updateData.image2 = await uploadOnCloudinary(req.files.image2[0].path);
        if (req.files?.image3) updateData.image3 = await uploadOnCloudinary(req.files.image3[0].path);

        let listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        
        return res.status(201).json(listing);
    } catch (error) {
        console.error("UpdateListing Error:", error);
        return res.status(500).json({ message: `UpdateListing Error: ${error.message}` });
    }
}

export const deleteListing = async (req, res) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findByIdAndDelete(id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        
        await User.findByIdAndUpdate(listing.host, { $pull: { listing: id } });
        
        return res.status(201).json({ message: "Listing deleted" });
    } catch (error) {
        return res.status(500).json({ message: `DeleteListing Error: ${error.message}` });
    }
}

export const ratingListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { ratings } = req.body;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        listing.ratings = Number(ratings);
        await listing.save();

        return res.status(200).json({ ratings: listing.ratings });
    } catch (error) {
        return res.status(500).json({ message: "Rating error" });
    }
};

export const search = async (req, res) => {
    try {
        const { query } = req.query;
        // खाली सर्च पर सभी लिस्टिंग दिखाएं या एरर दें (यहाँ मैंने खाली पर सब दिखाने का विकल्प दिया है)
        if (!query || query.trim() === "") {
            const listings = await Listing.find().sort({ createdAt: -1 });
            return res.status(200).json(listings);
        }
    
        const listing = await Listing.find({
            $or: [
                { landMark: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { title: { $regex: query, $options: "i" } },
            ],
        });
    
        return res.status(200).json(listing);
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}