import { Beer } from '../../domain/Beer'

export interface BeerDetailState {
  loading: boolean
  beer?: Beer
}

export const initialBeerDetailState: BeerDetailState = { loading: false }
