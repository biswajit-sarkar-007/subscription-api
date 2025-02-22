 import mongoose from "mongoose";

 const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLenghth:2,
        maxLength:50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'please fill a vlaid email']
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLenghth: 6,
    }
 }, {timestamps: true});


 const User = mongoose.model( 'User',  userShema);

 export default User;