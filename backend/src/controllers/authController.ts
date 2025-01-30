import  { Request, Response } from "express" ; 
import { User }  from "../models/user"
import {auth , db} from "../server" ;

import { generateToken } from "../utils/jwtUtils" 

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
        console.log("are we even hitting the api") ;
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ message: "ID Token required" });
        }

        console.log(idToken) ; 

        const decodedToken = await auth.verifyIdToken(idToken);

        console.log(decodedToken) ;

        const userId = decodedToken.uid;
        console.log(userId) ;

        const token = generateToken(userId);
        console.log(token) ; 
       return res.status(200).json({ message: "Login successful", token });
    } catch (error : any ) {
        return res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
};