import { z as zod } from 'zod'

export const userRegisterValidator = zod.object({
    fullName: zod.string({ required_error: 'FullName is required' }),
    email: zod.string({ required_error: 'Email is required' }).email(),
    password: zod.string().min(8, 'Password must be of 8 char min length'),
})
export const userLoginValidator = zod.object({
    email: zod.string({ required_error: 'Email is required' }).email(),
    password: zod.string().min(8, 'Password must be of 8 char min length'),
})
export const userVerifyValidator = zod.object({
    email: zod.string({ required_error: 'Email is required' }).email(),
})
export const createProjectValidator = zod.object({
    projectName: zod.string({ required_error: 'Project name is required' }),
    projectDesc: zod.string({ required_error: 'Project description is required' }),
})

export const modifyProjectValidator = zod.object({
    projectName: zod.string().optional(),
    projectDesc: zod.string().optional(),
})

export const createTaskValidator = zod.object({
    content: zod.string({ required_error: 'Content is required' }),
    assignedTo: zod.string({ required_error: 'AssignedTo is required' }),
    dueDate: zod.string({ required_error: 'Due date is required' }),
})

export const modifyTaskValidator = zod.object({
    content: zod.string().optional(),
    assignedTo: zod.string().optional(),
    dueDate: zod.string().optional(),
})

// project.parse({
//     projectName: 'DevBoard',
//     projectDesc: 'API for Task Management System',
//     createdBy: 'some-user-id',
// })

// user.parse({ fullName: 'Ritik Mehta', email: 'rithikmehta@gmail.com', password: 'something' })
// task.parse({
//     content: 'Implement authentication',
//     level: 'High',
//     createdBy: 'some-user-id',
//     project: 'some-project-id',
// })
