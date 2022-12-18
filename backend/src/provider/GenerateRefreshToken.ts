import dayjs from 'dayjs'

import { prismaClient } from '../prisma/client'

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'second').unix()

    const generateRefreshToken = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshToken }
