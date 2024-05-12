import Router from 'express'
const userRouter = new Router()

import userController from '../controller/user.controller.js'

userRouter.post('/user', userController.createUser)
userRouter.get('/user', userController.getUsers)
userRouter.get('/user/:id', userController.getOneUser)
userRouter.put('/user', userController.updateUser)
userRouter.delete('/user/:id', userController.deleteUser)

export default userRouter