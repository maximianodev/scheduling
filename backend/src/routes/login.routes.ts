import { Router } from 'express'

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenUserController } from '../useCases/refreshTokenUser/RefreshTokenUserController'

const loginRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

loginRoutes.post('/authenticate', authenticateUserController.handle)
loginRoutes.post('/refresh_token', refreshTokenUserController.handle)

export { loginRoutes }
