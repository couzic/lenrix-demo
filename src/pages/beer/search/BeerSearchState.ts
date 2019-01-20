export interface BeerSearchState {
  searchInputValue: string
  pending: boolean
}

export const initialBeerSearchState: BeerSearchState = {
  searchInputValue: '',
  pending: false
}
