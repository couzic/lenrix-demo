import { Beer } from '../../domain/Beer'

export interface HomeState {
  searchInputValue: string
  loading: boolean
  beers: Beer[]
}

export const initialHomeState: HomeState = {
  searchInputValue: '',
  loading: false,
  beers: []
}
