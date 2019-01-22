import { Beer } from '../../../domain/Beer'

export interface BeerSearchState {
  pending: boolean
  beers: Beer[]
}

export const initialBeerSearchState: BeerSearchState = {
  pending: false,
  beers: []
}
