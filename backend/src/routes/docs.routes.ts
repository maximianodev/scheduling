import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'

const docsRoutes = Router()

docsRoutes.get('/', swaggerUi.setup(swaggerDocument))

export { docsRoutes }
