import { Router } from 'express'

import endureAuthenticated from '../middleware/ensureAuthenticated'

const fakeApiRoutes = Router()

fakeApiRoutes.get('/', endureAuthenticated, (request, response) => {
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
