import { body, param } from 'express-validator'

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
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Email is required'),
    ]
}
const deleteProjectValidator = () => {
    return [param('projectId').notEmpty().withMessage('Project ID is required')]
}
const modifyProjectValidator = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Email is required'),
    ]
}
const addTaskValidator = () => {
    return [
        param('projectId')
            .notEmpty()
            .withMessage('ProjectId is required, server error'),
        param('projectId')
            .isString()
            .withMessage('Incorrect Project Id Validator'),
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('assignedTo')
            .notEmpty()
            .withMessage('AssignedTo is required')
            .isObject()
            .withMessage('AssignedTo must be an object'),

        body('assignedBy')
            .notEmpty()
            .withMessage('AssignedBy is required')
            .isObject()
            .withMessage('AssignedBy must be an object'),
    ]
}

export {
    authValidator,
    emailVerifyValidator,
    loginValidator,
    addMemberValidator,
    removeMemberValidator,
    createProjectValidator,
    addTaskValidator,
    modifyProjectValidator,
    deleteProjectValidator,
}
