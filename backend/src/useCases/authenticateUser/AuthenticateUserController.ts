import { Request, Response } from 'express'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const createUserUseCase = new AuthenticateUserUseCase()

    const user = await createUserUseCase.execute({
      email,
      password,
    })

    return response.status(200).json(user)
  }
}

export { AuthenticateUserController }
