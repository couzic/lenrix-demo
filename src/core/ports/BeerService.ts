import { Observable } from 'rxjs'

import { Beer } from '../../domain/Beer'

export interface BeerService {
  searchBeers(query: string): Observable<Beer[]>
  fetchBeer(beerId: Beer['id']): Observable<Beer | undefined>
}
