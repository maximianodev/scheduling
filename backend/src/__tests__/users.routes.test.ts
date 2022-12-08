import { hash } from 'bcryptjs'
import request from 'supertest'

import { app } from '../index'

describe('[POST] /users/:id', () => {
  it('should be able to create new users', async () => {
    const randomHash = await hash('teste', 8)
    const email = `test${randomHash}@gmail.com`
    const password = randomHash

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
    const randomHash = await hash('teste', 8)
    const email = `test${randomHash}@gmail.com`
    const password = randomHash

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
