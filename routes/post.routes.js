import Router from 'express'
const postRouter = new Router()

import postController from '../controllers/post.controller.js'

postRouter.post('/post', postController.create)
postRouter.get('/post', postController.get)
postRouter.delete('/post', postController.remove)
postRouter.put('/post', postController.update)

export default postRouter