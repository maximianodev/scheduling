import { Router } from 'express'

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController'

const loginRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

loginRoutes.post('/authenticate', authenticateUserController.handle)

export { loginRoutes }
