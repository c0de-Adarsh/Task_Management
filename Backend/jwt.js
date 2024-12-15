
// const jwt = require('jsonwebtoken');
 
// const jwAuthMiddleware = (req , res , next) =>{
    
//     const authorization = req.headers.authorization
//     if(!authorization) return res.status(401).json({error:'Token not found'});

//     const toekn = req.headers.authorization.split('')[1];
//     if(!toekn) return res.status(401).json({error:'Unauthorized'})

//         try {
//             //verify the jwt token
//             const decode = jwt.verify(toekn,process.env.JWT_SECRET);
            
//             //attach user information to the request object
//             req.user = decode;
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401).json({error:'Ivalid token'})
//         }
// }

//     //generate jwt token

//     const generateToken = (userdata) =>{
//         //generate new jwt token using user data 
//         return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:3000});

//     }

//     module.exports = {jwAuthMiddleware, generateToken};





// const jwt = require('jsonwebtoken');

// // JWT Authentication Middleware
// const jwAuthMiddleware = (req, res, next) => {
//     const authorization = req.headers.authorization;

//     // Check if Authorization header exists
//     if (!authorization) {
//         return res.status(401).json({ error: 'Token not found' });
//     }

//     // Extract token from 'Bearer <token>' format
//     const token = authorization.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     try {
//         // Verify the JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach user information to the request
//         req.userId = decoded.id; // Extract the user ID from the token payload
//         next();
//     } catch (error) {
//         console.error('JWT Verification Error:', error.message);
//         res.status(401).json({ error: 'Invalid token' });
//     }
// };

// // Generate JWT Token Function
// const generateToken = (userdata) => {
//     return jwt.sign({ id: userdata._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// module.exports = { jwAuthMiddleware, generateToken };






const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const jwAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    // Check if Authorization header exists
    if (!authorization) {
        return res.status(401).json({ error: 'Token not found' });
    }

    // Extract token from 'Bearer <token>' format
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request
        req.userId = decoded.id; // Extract the user ID from the token payload
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { jwAuthMiddleware };

