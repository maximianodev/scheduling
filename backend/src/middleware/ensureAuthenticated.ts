import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export default function endureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      message: 'Unauthorized',
    })
  }

  const [, token] = authToken.split(' ')

  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized',
    })
  }

  try {
    verify(token, process.env.JSONWEBTOKEN_KEY)

    return next()
  } catch (err) {
    return response.status(401).json({
      message: 'invalid token',
    })
  }
}
