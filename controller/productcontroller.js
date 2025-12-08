import { Product } from "../model/product.js"

//create product
export const createProduct = async (req, res) => {
    try{
        const {name, description, price, category, stock, img} = req.body
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            img
        })
        res.status(201).json({success:true, 
            message: "Product created successfully",
            product: newProduct
        })
    } catch (error) { 
        console.error(error)
        res.status(500).json({
            success:false, 
            message: "Server Error", error})
    }
}

//get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            success:true,
            message: "Products retrieved successfully",
            products
        })
    } catch (error) {
        res.status(500).json({
            success:false, 
            message: "Server Error", error})
    }
}


//get product id

export const getproductByid = async (req,res) =>{
    const ProductId = req.params.id
    try{
        const Product  = await Product .findById(ProductId).select
        ('-password')
        if(!Product ) return res.status(404).json({message:"User Not Found"})
            res.status(200).json(Product)
    }catch (error){
        res.status(500).json({message:error.message})

    }
}