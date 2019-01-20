import {
  BeerDetailState,
  initialBeerDetailState
} from '../pages/beer/detail/BeerDetailState'
import {
  BeerSearchState,
  initialBeerSearchState
} from '../pages/beer/search/BeerSearchState'

export interface AppState {
  beer: {
    search: BeerSearchState
    detail: BeerDetailState
  }
}

export const initialAppState: AppState = {
  beer: {
    search: initialBeerSearchState,
    detail: initialBeerDetailState
  }
}
