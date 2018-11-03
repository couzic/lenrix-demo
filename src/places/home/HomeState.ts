import { Beer } from '../../domain/Beer'

export interface HomeState {
  searchInputValue: string
  searching: boolean
  results: Beer[]
}

export const initialHomeState: HomeState = {
  searchInputValue: '',
  searching: false,
  results: []
}
