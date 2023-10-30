const mongoose = require('mongoose');
const Product = require('../models/productModel');

//get all products 
const getProducts = async(req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

//get users products 
const getUserProducts = async(req, res) => {
    try {
        const id = req.user._id;
        const products = await Product.find({seller_id: id}).sort({createdAt: -1});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get a single product
const getProduct = async(req, res) => {
    try {
        const {id} = req.params;
        
        //id is not valid ObjectId 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No Such Product Found"});
        }
        
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({error: "No Such Product Found"});
        }
        
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// create a new product
const createProduct = async(req, res) => {
    const {title, category, price, description} = req.body;

    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!price) {
        emptyFields.push('price');
    } 
    if (!description) {
        emptyFields.push('description');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        const {_id: seller_id, username: seller} = req.user;
        const product = await Product.create({title, category, price: Number(price), description, seller_id, seller, buyer_id: undefined, buyer: undefined});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// delete a single product
const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No Such Product Found"});
        }
        
        const product = await Product.findOneAndDelete({_id: id});

        if (!product) {
            return res.status(404).json({error: "No Such Product Found"});
        } 

        if (product.seller_id != user_id) {
            return res.status(401).json({error: "Invalid Request (User not authorized to delete this product)"});
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// update a single product
const updateProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No Such Product Found"});
        }

        const product = await Product.findOneAndUpdate({_id: id, seller_id: user_id}, {
            ...req.body
        });

        if (!product) {
            return res.status(404).json({error: "No Such Product Found"});
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


module.exports = {
    getProducts,
    getUserProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}    