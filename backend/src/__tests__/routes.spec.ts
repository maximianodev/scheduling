import request from 'supertest'

import { app } from '../index'

describe('[POST] /users/:id', () => {
  const eightDigitRandom = String(Math.random()).substring(2, 10)
  const email = `test${eightDigitRandom}@gmail.com`
  const password = eightDigitRandom

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
    delete data.password

    expect(data).toMatchObject({
      name: 'Test',
      email,
    })
  })

  it('should block duplicate users', async () => {
    await request(app).post('/users/create').send({
      name: 'Test',
      email,
      password,
    })

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
