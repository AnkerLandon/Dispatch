const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, '4!8Dy7fzQL_`[3E%(hs(y.]L+bhNk/2x')
    next();
  } catch (error) {
    res.status(401).json({message: "auth failed Token"});
  }

};
