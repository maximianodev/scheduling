import { Request, Response } from 'express'

import { RefreshTokenUserUseUseCase } from './RefreshTokenUserUseCase'

class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body

    const refreshTokenUserUseUseCase = new RefreshTokenUserUseUseCase()
    const token = await refreshTokenUserUseUseCase.execute(refresh_token)

    return response.json({ token })
  }
}

export { RefreshTokenUserController }
