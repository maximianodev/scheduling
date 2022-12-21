import request from 'supertest'

import { app } from '../../index'

const eightDigitRandom = String(Math.random()).substring(2, 10)
const email = `test${eightDigitRandom}@gmail.com`

describe('[POST] /login/authenticate', () => {
  it('should block login from a non-existing email', async () => {
    await request(app)
      .post('/login/authenticate')
      .send({
        email: 'teste-non-existing@teste.com',
        password: '12345678',
      })
      .expect(403)
  })

  it('should block login from bad password', async () => {
    await request(app)
      .post('/login/authenticate')
      .send({
        email,
        password: '12345678',
      })
      .expect(403)
  })
})
