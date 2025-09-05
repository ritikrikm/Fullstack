import dotenv from 'dotenv'
import { API_ERROR } from '../utils/api-error.js'
import jwt from 'jsonwebtoken'
dotenv.config({
    path: './.env',
})
const userLoggedIn = (req, res, next) => {
    console.log('Eneterd into the middleware for is UserloggedIn')

    let token
    let headers = req.headers['authorization']

    if (!headers || !headers.startsWith('Bearer '))
        return new API_ERROR(400, 'Token Error')
    if (!req.cookies || !req.cookies.refresh)
        return new API_ERROR(400, 'Cookie Error')
    headers = headers.slice(7).trim() //access token
    token = req.cookies.refresh
    //console.log(token + headers)
    if (!token && !headers) return new API_ERROR(400, 'No Token Present')
    console.log('WOHO')
    try {
        console.log('WOHO1232')
        var decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log('WOHO12')
        // decoded would be an object containing the payload of the JWT token.
        // For example, a sample decoded object might look like:
        // {
        //   _id: '60f7c2b5e1d2c8a1b4e5d6f7',
        //   role: 'user',
        //   email: 'user@example.com',
        //   iat: 1718123456,
        //   exp: 1718127056
        // }

        // decoded.exp is a number (UNIX timestamp in seconds), not a Date object.
        // You should compare decoded.exp * 1000 (to convert to ms) with Date.now().
        if (decoded.exp * 1000 > Date.now()) {
            req.user = decoded
        } else {
            return next(new API_ERROR(401, 'Token expired'))
        }
        console.log('decoded', decoded)

        next()
    } catch (error) {
        console.log('error in the middleware for verifying the token')
    }
}
export { userLoggedIn }
