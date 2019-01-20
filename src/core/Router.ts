import { History } from 'history'
import { createBrowserRouter, route } from 'observable-tree-router'

export const createRouter = (history: History) =>
  createBrowserRouter(history, {
    home: route({
      path: '/'
    }),
    beer: route({
      path: '/beer',
      nested: {
        search: route({
          path: '/search'
        }),
        detail: route({
          path: '/:beerId',
          params: ['beerId']
        })
      }
    })
  })

export type Router = ReturnType<typeof createRouter>
