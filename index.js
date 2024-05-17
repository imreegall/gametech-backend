console.log('SERVER START')

import express from 'express'

import userRouter from './routes/user.routes.js'
import goodRouter from './routes/good.routes.js'
import postRouter from './routes/post.routes.js'

const PORT = 8080

const app = express()

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', goodRouter)
app.use('/api', postRouter)

app.use(express.static( 'public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))