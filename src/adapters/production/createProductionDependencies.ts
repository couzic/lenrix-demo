import { createBrowserHistory } from 'history'

import { CoreDependencies } from '../../core/CoreDependencies'
import { createRouter } from '../../core/Router'
import { createBeerService } from './createBeerService'

export const createProductionDependencies = (): CoreDependencies => {
  const router = createRouter(createBrowserHistory())
  const beerService = createBeerService()
  return { router, beerService }
}
