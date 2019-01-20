import { createBrowserHistory } from 'history'

import { CoreDependencies } from '../../core/CoreDependencies'
import { createBeerService } from './createBeerService'

export const createProductionDependencies = (): CoreDependencies => {
  const history = createBrowserHistory()
  const beerService = createBeerService()
  return { history, beerService }
}
