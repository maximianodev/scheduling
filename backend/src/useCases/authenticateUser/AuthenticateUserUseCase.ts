import { compare } from 'bcryptjs'

import { prismaClient } from '../../prisma/client'

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
  }
}

export { AuthenticateUserUseCase }
