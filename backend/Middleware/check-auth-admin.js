const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    console.log('test', req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = {
      userName: decodedToken.userName,
      userId: decodedToken.userId,
      rank: decodedToken.rank
    }
    next();
  } catch (error) {
    res.status(401).json({message: "auth failed Token"});
    console.log('check Auth err:', error);
  }

};
