import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  execute(userId: string) {
    const token = sign({}, process.env.JSONWEBTOKEN_KEY, {
      subject: userId,
      expiresIn: '20s',
    })

    return token
  }
}

export { GenerateTokenProvider }
