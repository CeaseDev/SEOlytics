import express from 'express'; 
import cors from "cors" ; 
import dotenv from "dotenv" ; 
import analysisRouter from "./routes/analysis" ;
import authRouter from "./routes/auth" ;
import admin from "firebase-admin" ; 

import { ServiceAccount } from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json" ;  


admin.initializeApp({
    credential : admin.credential.cert(serviceAccount as ServiceAccount) , 
}) ; 
console.log("firebase init success") ; 

dotenv.config() ; 

const app = express() ; 

app.use(cors()) ; 
app.use(express.json()) ;

app.use("/api/auth" , authRouter) ; 
app.use("/api/seo" , analysisRouter) ; 

export const auth = admin.auth() ; 
export const db = admin.firestore() ; 

const PORT = process.env.PORT || 8080 ; 

app.listen( PORT , () =>{
    console.log("server Running on" , PORT) ; 
} ) ; 

