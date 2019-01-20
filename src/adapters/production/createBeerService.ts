import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

import { BeerService } from '../../core/ports/BeerService'

const beersApiUrl = `https://api.punkapi.com/v2/beers`

export const createBeerService = (): BeerService => ({
  searchBeers(name) {
    return ajax.getJSON(beersApiUrl + '?beer_name=' + name)
  },
  fetchBeer(beerId) {
    return ajax
      .getJSON(beersApiUrl + '/' + beerId)
      .pipe(map(_ => (_ as any)[0]))
  }
})
