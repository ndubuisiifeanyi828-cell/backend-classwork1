import express from "express";
import { createStudents, deleteUser, getAllStudents,getUserByid,loginUser, updateUser } from "../controller/usercontroller.js";
const router = express.Router()
router.post('/register',createStudents)
router.get('/',getAllStudents)
router.get('/:id',  getUserByid)
router.post('/login', loginUser)
router.put('/update/:id',updateUser)
router.delete('/:id', deleteUser)
export default router