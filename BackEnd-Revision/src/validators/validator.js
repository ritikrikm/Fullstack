import { body } from 'express-validator'

const authValidator = () => {
    return [
        body('fullName').notEmpty().withMessage('Name is required'),
        body('fullName')
            .isLength({ min: 6 })
            .withMessage('Min Length of name is 6'),
        body('fullName').isLength({ max: 20 }).withMessage('Max length is 20'),
        body('email').notEmpty().withMessage('Email is required'),
        body('email').isEmail().withMessage('Email validation wrong'),
        // body('isVerified')
        //     .custom((val) => val === 'true')
        //     .withMessage('Email not verified'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Passsword length shuld be min 8'),
        body('password')
            .isLength({ max: 20 })
            .withMessage('Max password length is 20'),
    ]
}
const emailVerifyValidator = () => {
    return [
        body('email').notEmpty().withMessage('Email is required'),
        body('email').isEmail().withMessage('Email is incorrect'),
    ]
}
const loginValidator = () => {
    return [
        body('email').notEmpty().withMessage('Email is required'),
        body('email').isEmail().withMessage('Email is incorrect'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Passsword length shuld be min 8'),
        body('password')
            .isLength({ max: 20 })
            .withMessage('Max password length is 20'),
    ]
}
const addMemberValidator = () => {
    return [
        body('role').notEmpty().withMessage('Role is required'),
        body('addUserEmail').isEmail().withMessage('Email is incorrect'),
    ]
}
const removeMemberValidator = () => {
    return [
        body('role').notEmpty().withMessage('Role is required'),
        body('removeUserEmail').isEmail().withMessage('Email is incorrect'),
    ]
}
const createProjectValidator = () => {
    return [
        body('name').notEmpty().withMessage('Role is required'),
        body('description').notEmpty().withMessage('Email is required'),
        body('createdBy').notEmpty().withMessage('Internal Error'),
    ]
}

export {
    authValidator,
    emailVerifyValidator,
    loginValidator,
    addMemberValidator,
    removeMemberValidator,
    createProjectValidator,
}
