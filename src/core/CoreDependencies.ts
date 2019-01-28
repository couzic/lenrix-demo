import { SchedulerLike } from 'rxjs'

import { BeerService } from './ports/BeerService'
import { Router } from './Router'

export interface CoreDependencies {
  router: Router
  scheduler?: SchedulerLike
  beerService: BeerService
}
