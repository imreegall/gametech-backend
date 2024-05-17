import Router from 'express'
const goodRouter = new Router()

import goodController from '../controllers/good.controller.js'

goodRouter.post('/good', goodController.create)
goodRouter.get('/good', goodController.get)
goodRouter.delete('/good', goodController.remove)
goodRouter.put('/good', goodController.update)

export default goodRouter