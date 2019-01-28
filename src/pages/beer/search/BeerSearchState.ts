import { Beer } from '../../../domain/Beer'

export interface BeerSearchState {
  pending: boolean
  results: Beer[]
}

export const initialBeerSearchState: BeerSearchState = {
  pending: false,
  results: []
}
