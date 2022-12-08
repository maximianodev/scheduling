import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.message === 'E-mail already exists') {
    response.status(409)
    response.json({ error: error.message, status: 'Error' })
  }

  if (error.message === 'E-mail or password incorrect') {
    response.status(403)
    response.json({ error: error.message, status: 'Error' })
  }

  next(error)
}
