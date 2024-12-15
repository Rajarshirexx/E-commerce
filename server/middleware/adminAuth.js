import jwt from "jsonwebtoken";

async function adminAuth(req, res, next) {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({success: false, message: "Not Authorized, login again."})
        } 
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Not Authorized, login again."})
        }
        next()
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message});
        }
    }

export default adminAuth
