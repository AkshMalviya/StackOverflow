import Jwt  from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import users from "../models/auth.js"

export const signup = async (req,res) =>{
    const {name,email,password} = req.body;
    try{
        const existinguser = await users.findOne({email})
        if(existinguser){
            return res.status(400).json({message:'user already exist'})
        }
        const hashedPassword = await bcrypt.hash(password , 12)
        const newUser = await users.create({name,email,password : hashedPassword})
        const token = Jwt.sign({email:newUser.email}, process.env.JWT_SECRET ,{expiresIn:"1h"})
        res.status(200).json({result:newUser, token})
    }catch(err){
        res.status(500).json("something went wrong")
    }
}
export const login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const existinguser = await users.findOne({email})
        if(!existinguser){
            return res.status(400).json({message:'user don\'t exist'})
        }
        const isPasswordCrt = await bcrypt.compare(password , existinguser.password)
        console.log(isPasswordCrt)
        if(isPasswordCrt == false){
            console.log(isPasswordCrt)
            return res.status(400).json({message:"Incorrect credentials"})
        }
        const token = Jwt.sign({email:existinguser.email},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({result:existinguser, token})
    }catch(err){
        res.status(500).json("something went wrong")
    }

}