const jwt = require("jsonwebtoken");
//const jwksRsa = require('jwks-rsa');
//const jwt = require('express-jwt');
//var { expressjwt: jwt } = require("express-jwt");
 
exports.verifyTokens = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}


// exports.verifyTokens = jwt({
//     // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://dev-f1bxr64pd8ivjwg6.us.auth0.com/.well-known/jwks.json`
//     }),
  
//     // Validate the audience and the issuer
//     audience: process.env.AUDIENCE, //replace with your API's audience, available at Dashboard > APIs
//     issuer: process.env.ISSUER_BASE_URL,
//     algorithms: [ 'RS256' ]
//   });

  
