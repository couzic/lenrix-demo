import {
  BeerDetailState,
  initialBeerDetailState
} from '../places/beer/BeerDetailState'
import { HomeState, initialHomeState } from '../places/home/HomeState'

export interface AppState {
  home: HomeState
  beerDetail: BeerDetailState
}

export const initialAppState: AppState = {
  home: initialHomeState,
  beerDetail: initialBeerDetailState
}
