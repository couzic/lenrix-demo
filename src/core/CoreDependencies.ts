import { BeerService } from './ports/BeerService'
import { Router } from './Router'

export interface CoreDependencies {
  router: Router
  beerService: BeerService
}
