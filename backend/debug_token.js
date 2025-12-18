const jwt = require('jsonwebtoken');

// Change this to the secret found in AuthModule (default 'secretKey')
const secret = 'secretKey'; 
// Token grabbed from the user's run or testing (dummy value for now to show structure)
// Ideally, if I could get the actual token causing failure it would be best.

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        console.log("Decoded Token:", decoded);
    } catch (err) {
        console.error("Token verification failed:", err.message);
    }
}

// I can't easily get the user's token, but I can check the strategy file.
