
import bcrypt from "bcryptjs";
 import jwt from 'jsonwebtoken'
import cohortfour from "../model/usermodel.js";



 //REGISTERATION USER
export const createStudents = async (req, res) =>{
    const{
        name,email, phoneNumber, password, country, state, userName
    } = req.body
    try {
        //check if email exist
        const exist = await cohortfour.findOne({email})
        if (exist) return res.status(400).json
       ({message:"Email Alredy Exist"})
// 
//check if user name exist
        const username = await cohortfour.findOne({userName})
        if (username) return res.status(400).json
       ({message:"user Alredy Exist"})




  //phoneNumber
const phone = await cohortfour.findOne({phoneNumber})
if (phone) return res.status(400).json
({message:"phone number already exist"})

       
   //HASH PASSWORD

 const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password,
    salt)
            //create user
            const Students = await students.create({
                name,
                email,
                phoneNumber,
                password:hashPassword,
                country, 
                state, 
                userName
            })
            return res.status(201).json({
                message:"Registeration Successful", Students
            })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error", error})
        
    }
    
} 

//GET ALL USERS
export const getAllStudents = async(req, res) => {
try {
    let student = await cohortfour.find().select('-password')
    res.status(200).json(student)
} catch (error) {
    res.status(500).json({message:"server Error",
        error})
 }
}

//LOGIN
export const loginUser = async(req, res) =>{
    const {email, password} = req.body
try {
    //check user/email exist
    const user = await cohortfour.findOne({email})
    if(!user) return res.status(404).json({message:"email not registered"})

        // compare password

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json
        ({message:"incorrect password"})
        const token = jwt.sign({id:user.id}, process.env.
        SECRET_KEY, {expiresIn: '1hr'}
        )

   res.status(200).json({message:"login successful",
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        phoneNumber:user.phoneNumber


    }})
    
        
    } catch (error) {
         res.status(500).json({message:error.message})
    }
   }  

   //GET USER BY ID
export const getUserByid = async (req,res) =>{
    const userId = req.params.id
    try{
        const user = await cohortfour.findById(userId).select
        ('-password')
        if(!user) return res.status(404).json({message:"User Not Found"})
            res.status(200).json(user)
    }catch (error){
        res.status(500).json({message:error.message})

    }
}

  // update user
export const updateUser = async (req, res) => {
    let userId = req.params.id;
    const { name, email, phoneNumber, country, state } = req.body
    try {
        let user = await cohortfour.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" })
            // update only updated fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.country = country || user.country;
        user.state = state || user.state;
        await user.save();
        res.status(200).json({ message: "User updated successfully", 
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber: user.phoneNumber,
            country:user.country,
            state: user.state

        }

        })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Delete user
export const deleteUser = async (req,res) => {
    const userId =req.params.id
    try {
        const user = cohortfour.findById(userId)
        if (!user) return res.status(404).json({message:"user doesnt exist"})
            await user.deleteOne()
        res.status(200).json({message:"user deleted sucessfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}