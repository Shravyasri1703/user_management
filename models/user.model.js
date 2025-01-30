import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({

    Name : {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        reuqired: true
    },

    password: {
        type: String,
        reuqired: true,
        minLength: 6,
    },

    Bio: {
        type: String,
        default: ""
    },

    mobileNumber : {
        type : String,
        default: ""
    },

    role: {
        type: String,
        enum: ["general", "admin"],
        default: "general"
    },

    Availibility: {
        type: [{
            start: String,
            end: String
        }],
        default: []
    }


},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User