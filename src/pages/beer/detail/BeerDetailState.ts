import { Beer } from '../../../domain/Beer'

export interface BeerDetailState {
  pending: boolean
  beer?: Beer
}

export const initialBeerDetailState: BeerDetailState = {
  pending: false
}
