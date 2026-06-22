import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        
        if (!token) {
            // Added 'return' here
            return res.status(401).json({ message: "User doesn't have a token" });
        }

        // jwt.verify throws an error if invalid, so we don't need "if (!verifyToken)"
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure the ID matches how you signed the token
        // If you signed it as { userId: ... }, this is correct:
        req.userId = decoded.userId; 
        
        next();
    } catch (error) {
        return res.status(500).json({ message: `isAuth error: ${error.message}` });
    }
};

export default isAuth;



// import jwt from "jsonwebtoken"
// const isAuth = async (req,res,next) => {

//     try {
//         let {token} = req.cookies
//         if(!token){
//             res.status(400).json({message:"user doesn't have a token"})
//         }
//         let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
//         if(!verifyToken){
//             res.status(400).json({message:"user doesn't have a Validtoken"})
//         }
//         req.userId = verifyToken.userId
//         next()

//     } catch (error) {
//         res.status(500).json({message:`isAuth error ${error}`})
        
//     }
    
// }
// export default isAuth