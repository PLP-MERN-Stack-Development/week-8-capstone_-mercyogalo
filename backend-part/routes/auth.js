import express from "express";
const router=express.Router();
import User from "../models/User.js";
import jwt from "jsonwebtoken";



router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send({message: 'user created successfully'});
    } catch (error) {
         if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(400).json({
      message: 'Signup failed',
      error: error.message,
    });
    }
})

router.post('/login', async (req , res)=> {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send('Invalid credentials');
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1hr'});
        res.send({token});
    } catch (error) {
     res.status(500).send(error);
    }
})

export default router;