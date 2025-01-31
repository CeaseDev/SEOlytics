import  { Request, Response } from "express" ; 
import { User }  from "../models/user"
import {auth , db} from "../server" ;

import { generateToken , verifyToken} from "../utils/jwtUtils" 
import { messaging } from "firebase-admin";

export const register = async (req : Request, res : any) => {
    try{
        const {email , password } = req.body ;

        if(!email  || !password){
            return res.status(400).json({
                message : "Invalid Email or Password" 
            })
        }

        const userRecord = await auth.createUser({
            email,
            password,
        }) ; 


        const user : User = {
            uid : userRecord.uid,
            email : userRecord.email!,
            createdAt : new Date(),
        }

        await db.collection("users").doc(user.uid).set(user) ; 

        const token = generateToken(user.uid);

        return res.status(201).json({message : "User Created Successfully" , token}) ;
    } catch(err){
        return res.status(500).json({message : "Registration Failed" , err}) ;
    }
}


export const login= async (req: Request, res: any) => {
    try {

        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ message: "ID Token required" });
        }

        const decodedToken = await auth.verifyIdToken(idToken);

        const userId = decodedToken.uid;

        const token = generateToken(userId);

       return res.status(200).json({ message: "Login successful", token });
    } catch (error : any ) {
        return res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
};

export const verify = async (req: Request , res : any ) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1] ; 

        if(!token){
            return res.status(401).json({valid : false ,  message: "No Token found" }) ; 
        }

        const decoded = verifyToken(token) as {userId : string}; 

        const newToken = generateToken(decoded.userId) ;

        const user = await auth.getUser(decoded.userId) ;

        res.status(200).json({
            valid : true , 
            user : {
                uid : user.uid , 
                email: user.email , 
                emailVerified : user.emailVerified
            }, 
            token : newToken 
        }) ; 

    }catch(error){
        res.status(401).json({
            valid:false , 
            message : "Invalid or Expired token"
        })
    }
}