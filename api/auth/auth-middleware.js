// AUTHENTICATION
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config/index')
const restricted = (req, res, next) => {
  const token = req.headers.authotization
  if(token) {
   jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) {
      next({ status: 401, message: `token bad, ${err.message}` })
    } else {
      req.decodedJwt = decoded
    }
   } )
 } else {
   next({ status: 401, message: 'Wat? no token?' })
 }
}

// AUTHORIZATION
const checkRole = role => (req, res, next) => {
 if(req.decodedJwt && req.decodedJwt.role === role) {
  next()
 } else {
next({  status: 403, message: 'You have no power here! '})
 }
}

module.exports = {
  restricted,
  checkRole,
}
