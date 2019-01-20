import { History } from 'history'
import { Scheduler } from 'rxjs'

import { BeerService } from './ports/BeerService'

export interface CoreDependencies {
  history: History
  beerService: BeerService
  scheduler?: Scheduler
}
