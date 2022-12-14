import { CreateUserUseCase } from '../../useCases/createUser/CreateUserUseCase'

describe('create user useCase', () => {
  let createUserUseCase: CreateUserUseCase
  const eightDigitRandom = String(Math.random()).substring(2, 10)

  beforeAll(() => {
    createUserUseCase = new CreateUserUseCase()
  })

  it('should give error for invalid e-mail', async () => {
    const email = `test1${eightDigitRandom}@gmail.com`

    try {
      await createUserUseCase.execute({
        email,
        name: 'Teste',
        password: 'teste124',
      })
    } catch (err) {
      expect(err.message).toBe('Invalid E-mail')
    }
  })

  it('should give error for invalid password', async () => {
    const email = `test2${eightDigitRandom}@gmail.com`

    try {
      await createUserUseCase.execute({
        email,
        name: 'Teste',
        password: '1234567',
      })
    } catch (err) {
      expect(err.message).toBe(
        'Invalid password, must be at least 8 characters'
      )
    }
  })
})
