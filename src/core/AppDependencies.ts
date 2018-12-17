import { createBrowserHistory, History } from 'history'
import { Scheduler } from 'rxjs'

import { createBeerService } from '../adapters/createBeerService'
import { BeerService } from './ports/BeerService'

export interface AppDependencies {
  history: History
  beerService: BeerService
  scheduler?: Scheduler
}

export const createProductionDependencies = (): AppDependencies => {
  const history = createBrowserHistory()
  const beerService = createBeerService()
  return { history, beerService }
}
