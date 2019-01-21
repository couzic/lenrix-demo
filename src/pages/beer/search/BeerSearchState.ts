import { Beer } from '../../../domain/Beer'

export interface BeerSearchState {
  searchInputValue: string
  pending: boolean
  beers?: Beer[]
}

export const initialBeerSearchState: BeerSearchState = {
  searchInputValue: '',
  pending: false
}
