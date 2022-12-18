import { compare } from 'bcryptjs'

import { prismaClient } from '../../prisma/client'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'

interface IRequest {
  email: string
  password: string
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })

    if (!userAlreadyExists) {
      throw new Error('E-mail or password incorrect')
    }

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('E-mail or password incorrect')
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userAlreadyExists.id)

    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    )

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
