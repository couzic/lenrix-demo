import { History } from 'history'
import { SchedulerLike } from 'rxjs'

import { BeerService } from './ports/BeerService'

export interface CoreDependencies {
  history: History
  beerService: BeerService
  scheduler?: SchedulerLike
}
