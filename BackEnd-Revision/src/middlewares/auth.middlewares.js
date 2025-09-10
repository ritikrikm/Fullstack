import dotenv from 'dotenv'
import { API_ERROR } from '../utils/api-error.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.models.js'
import ProjectModel from '../models/Project.models.js'
import ProjectMember from '../models/ProjectMember.models.js'
import mongoose from 'mongoose'
dotenv.config({
    path: './.env',
})
const userLoggedIn = async (req, res, next) => {
    console.log('Eneterd into the middleware for is UserloggedIn')

    let token
    let headers = req.headers['authorization']
    const token1 = req.headers['authorization']?.replace('Bearer ', ' ').trim()
    console.log(token1)
    if (!headers || !headers.startsWith('Bearer '))
        return next(new API_ERROR(400, 'Token Error'))

    if (!req.cookies || !req.cookies.refresh)
        return next(new API_ERROR(400, 'Cookie Error'))
    headers = headers.slice(7).trim() //access token
    token = req.cookies.refresh
    //console.log(token + headers)
    if (!token && !headers) return next(new API_ERROR(400, 'No Token Present'))
    console.log('WOHO')

    console.log('WOHO1232')
    var decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(decoded?._id).select(
        '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
    )
    if (!user) return next(new API_ERROR(400, 'User not here'))
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
        req.user = user
    } else {
        return next(new API_ERROR(401, 'Token expired'))
    }
    console.log('decoded', decoded)

    next()
}
const projectPermission =
    (roles = []) =>
    async (req, res, next) => {
        let projectId = req.params
        let user = req.user
        user = user._id

        console.log(new mongoose.Types.ObjectId(projectId.projectId))
        console.log(new mongoose.Types.ObjectId(user._id))
        if (!projectId) return next(new API_ERROR(400, 'ProjectId not found'))
        const isProject = await ProjectModel.findById(projectId.projectId)
        if (!isProject) return next(new API_ERROR(400, 'Project not found'))
        const projectMember = await ProjectMember.findOne({
            project: new mongoose.Types.ObjectId(projectId.projectId),
            user: new mongoose.Types.ObjectId(user._id),
        })
        if (!projectMember)
            return next(new API_ERROR(400, 'ProjectMember Not found'))
        const currRole = projectMember?.role
        user.role = currRole //not doing something much (ignore)
        console.log(currRole)
        if (!roles.includes(currRole)) {
            return next(new API_ERROR(400, 'Permission Denied'))
        }
        next()
    }
export { userLoggedIn, projectPermission }
