const jwt = require("jsonwebtoken")
async function verifyUser(req, res, next) {

    const accessToken = req.cookies;

    try {
        const decod = jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET)

        
    } catch (error) {
        
    }
}