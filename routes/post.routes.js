import Router from 'express'
const postRouter = new Router()

import postController from '../controller/post.controller.js'

postRouter.post('/post', postController.createPost)
postRouter.get('/post', postController.getPostsByUser)

export default postRouter