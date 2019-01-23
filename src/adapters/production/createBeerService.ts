import { ajax } from 'rxjs/ajax'
import { delay, map } from 'rxjs/operators'

import { BeerService } from '../../core/ports/BeerService'

const beersApiUrl = `https://api.punkapi.com/v2/beers`

export const createBeerService = (): BeerService => ({
  searchBeers(name) {
    return ajax
      .getJSON(beersApiUrl + '?beer_name=' + name)
      .pipe(delay(500) as any)
  },
  fetchBeer(beerId) {
    return ajax.getJSON(beersApiUrl + '/' + beerId).pipe(
      delay(500),
      map(_ => (_ as any)[0])
    )
  }
})
