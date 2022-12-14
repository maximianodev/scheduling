import { hash } from 'bcryptjs'

import { prismaClient } from '../../prisma/client'
import { isValidEmail } from '../../utils/isValidEmail'

interface IUserRequest {
  name: string
  email: string
  password: string
}

class CreateUserUseCase {
  async execute({ name, email, password }: IUserRequest) {
    const minPasswordLength = 8

    if (!name || !email || !password) {
      throw new Error('Invalid data')
    }

    if (!isValidEmail(email)) {
      throw new Error('Invalid E-mail')
    }

    if (password.length < minPasswordLength) {
      throw new Error(
        `Invalid password, must be at least ${minPasswordLength} characters`
      )
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new Error('E-mail already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })

    return {
      email: user.email,
      name: user.name,
    }
  }
}

export { CreateUserUseCase }
