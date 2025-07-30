import jwt from "jsonwebtoken"

export const generateToken = async (userId, res) => {    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    const ONE_WEEK = 7 * 24 * 60 * 60 
    
    await res.cookie("jwt", token, {
        maxAge: ONE_WEEK * 1000,
        httpOnly: true, // prevent xss attacks of cross site scripting
        samaSite: "strict", 
        secure: process.env.NODE_ENV !== "development"
    })

    return token; 
}