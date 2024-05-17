import Router from 'express'
const userRouter = new Router()

import userController from '../controllers/user.controller.js'

userRouter.post('/user', userController.create)
userRouter.get('/user', userController.getAll)
userRouter.put('/user', userController.update)
userRouter.delete('/user/:id', userController.remove)

export default userRouter