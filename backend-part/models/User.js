import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
{
    name:{type:String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
}
);

userSchema.pre('save', async function (next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User=mongoose.model('User', userSchema)
export default User;