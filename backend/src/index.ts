import 'express-async-errors'
import express from 'express'

import { usersRoutes } from './routes/users.routes'
import { errorHandler } from './utils/errorHandler'

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.use('/users', usersRoutes)

app.use(errorHandler)

export { app }
