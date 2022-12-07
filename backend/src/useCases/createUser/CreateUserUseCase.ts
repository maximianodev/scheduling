import { hash } from 'bcryptjs'

import { prismaClient } from '../../prisma/client'

interface IUserRequest {
  name: string
  email: string
  password: string
}

class CreateUserUseCase {
  async execute({ name, email, password }: IUserRequest) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })

    return user
  }
}

export { CreateUserUseCase }
