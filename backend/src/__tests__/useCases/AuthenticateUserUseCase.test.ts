import request from 'supertest'

import { app } from '../../index'
import { AuthenticateUserUseCase } from '../../useCases/authenticateUser/AuthenticateUserUseCase'

describe('authenticate user useCase', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase

  const eightDigitRandom = String(Math.random()).substring(2, 10)
  const email = `test${eightDigitRandom}@gmail.com`
  const password = eightDigitRandom

  beforeAll(() => {
    authenticateUserUseCase = new AuthenticateUserUseCase()
  })

  it('should be able to create new user', async () => {
    const response = await request(app)
      .post('/users/create')
      .send({
        name: 'Test',
        email,
        password,
      })
      .expect(201)

    const data = response.body

    expect(data).toMatchObject({
      name: 'Test',
      email,
    })
  })

  it('should give error for invalid e-mail', async () => {
    try {
      await authenticateUserUseCase.execute({
        email: `asssa${email}`,
        password,
      })
    } catch (err) {
      expect(err.message).toBe('E-mail or password incorrect')
    }
  })

  it('should give error for invalid password', async () => {
    try {
      await authenticateUserUseCase.execute({
        email,
        password: 'Teste1234',
      })
    } catch (err) {
      expect(err.message).toBe('E-mail or password incorrect')
    }
  })
})
