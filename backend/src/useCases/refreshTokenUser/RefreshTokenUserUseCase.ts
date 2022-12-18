import dayjs from 'dayjs'

import { prismaClient } from '../../prisma/client'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'

class RefreshTokenUserUseUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    })

    if (!refreshToken) {
      throw new Error('Refresh token not found')
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.userId)

    if (refreshTokenExpired) {
      await prismaClient.refreshToken.delete({
        where: {
          userId: refreshToken.userId,
        },
      })

      const generateRefreshTokenProvider = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      )

      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenUserUseUseCase }
