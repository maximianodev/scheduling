import { Router } from 'express'

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from '../useCases/createUser/CreateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

usersRoutes.post('/create', createUserController.handle)
usersRoutes.post('/authenticate', authenticateUserController.handle)

export { usersRoutes }
