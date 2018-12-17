import { ajax } from 'rxjs/ajax'

import { BeerService } from '../core/ports/BeerService'

const beersApiUrl = `https://api.punkapi.com/v2/beers`

export const createBeerService = (): BeerService => ({
  searchBeers(name) {
    return ajax.getJSON(beersApiUrl + '?beer_name=' + name)
  }
})
