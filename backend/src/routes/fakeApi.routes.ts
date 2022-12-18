import { Router } from 'express'

const fakeApiRoutes = Router()

fakeApiRoutes.get('/', (request, response) => {
  return response.json([
    {
      id: 1,
      name: 'test1',
    },
    {
      id: 2,
      name: 'test2',
    },
  ])
})

export { fakeApiRoutes }
