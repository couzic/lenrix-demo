import { History } from 'history'
import { Scheduler } from 'rxjs'

import { BeerService } from './ports/BeerService'

export interface AppDependencies {
  history: History
  beerService: BeerService
  scheduler?: Scheduler
}
