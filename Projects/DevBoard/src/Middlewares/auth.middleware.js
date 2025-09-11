import jwt from 'jsonwebtoken'
import { logger } from '../Utils/logger.js'
import { API_ERROR } from '../Utils/api-error.js'
const isLoggedIn = async (req, res, next) => {
    const refreshToken = req.cookies?.refresh
    if (!refreshToken) {
        return res.status(401).json({ message: 'Not authenticated', success: false })
    }
    const header = req.headers?.authorization
    if (!header || !header.startsWith('Bearer '))
        return res.status(401).json({ message: 'Not authenticated', success: false })
    const accessToken = header.slice(7).trim()
    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET)
        if (!decoded)
            return res.status(401).json({ message: 'Not authenticated JWT', success: false })
        req.user = decoded

        next()
    } catch (error) {
        console.log(`Error in the middleware ${error}`)
        next(error)
    }
}
const validatePermission =
    (roles = []) =>
    async (req, res, next) => {
        const currRole = req.user?.role
        console.log(roles)

        console.log('CUURENT ROLE IS ' + currRole)
        if (!currRole) {
            return next(new API_ERROR(400, 'Role not present'))
        }
        if (roles.includes(currRole)) {
            logger.info('Permission Validated')
            return next()
        } else {
            logger.warn(`Permission denied for role: ${currRole}`)
            return next(new API_ERROR(403, 'Permission Error'))
        }
    }
export { isLoggedIn, validatePermission }
