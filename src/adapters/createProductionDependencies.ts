import { createBrowserHistory } from 'history'

import { createBeerService } from '../adapters/createBeerService'
import { AppDependencies } from '../core/AppDependencies'

export const createProductionDependencies = (): AppDependencies => {
  const history = createBrowserHistory()
  const beerService = createBeerService()
  return { history, beerService }
}
