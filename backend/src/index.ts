import 'express-async-errors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { docsRoutes } from './routes/docs.routes'
import { fakeApiRoutes } from './routes/fakeApi.routes'
import { loginRoutes } from './routes/login.routes'
import { usersRoutes } from './routes/users.routes'
import { errorHandler } from './utils/errorHandler'

const app = express()

// configuration
app.disable('x-powered-by')
app.use(express.json())

// routes
app.use('/login', loginRoutes)
app.use('/users', usersRoutes)
app.use('/fakeapi', fakeApiRoutes)
app.use('/api-docs', swaggerUi.serve, docsRoutes)

app.use(errorHandler)

export { app }
