import mongoose from "mongoose";
const cohortfourschema = new mongoose.Schema(
{
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true, },
    phoneNumber:{type:String, required:true, unique:true, },
    password:{type:String, required:true, unique:false, },
    country:{type:String, required:true, unique:false, },
    state:{type:String, required:true, unique:false, },
    address:{type:String,  unique:false, },
    userName: { type: String, required: true, unique: false }


},
{timestamps:true}

)


const cohortfour = mongoose.model("cohortfour",cohortfourschema)
export default cohortfour