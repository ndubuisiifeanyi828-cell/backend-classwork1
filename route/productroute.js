import express from "express"
import { createproduct, getAllproducts } from "../controller/productcontroller.js"


const productRouter = express.Router()
productRouter.post('/',createproduct)
productRouter.get('/',getAllproducts)
productRouter.get('/',getproductsById)

export default productRouter