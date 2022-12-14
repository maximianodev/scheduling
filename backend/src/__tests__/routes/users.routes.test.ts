import request from 'supertest'

import { app } from '../../index'

const eightDigitRandom = String(Math.random()).substring(2, 10)
const email = `test${eightDigitRandom}@gmail.com`
const password = eightDigitRandom

describe('[POST] /users/create', () => {
  it('should be able to create new users', async () => {
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

  it('should block duplicate users', async () => {
    await request(app)
      .post('/users/create')
      .send({
        name: 'Test',
        email,
        password,
      })
      .expect(409)
  })
})

describe('[POST] /users/authenticate', () => {
  it('should block login from a non-existing email', async () => {
    await request(app)
      .post('/users/authenticate')
      .send({
        email: 'teste-non-existing@teste.com',
        password: '12345678',
      })
      .expect(403)
  })

  it('should block login from bad password', async () => {
    await request(app)
      .post('/users/authenticate')
      .send({
        email,
        password: '12345678',
      })
      .expect(403)
  })
})
