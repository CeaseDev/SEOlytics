import jwt from "jsonwebtoken";
import dotenv from "dotenv" ;

dotenv.config() ;

export const generateToken = (userId: string) => {
    const JWT_SECRET =  process.env.JWT_SECRET ; 
    return jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: "6h" });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}; 
