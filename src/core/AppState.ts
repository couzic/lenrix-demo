import { HomeState, initialHomeState } from '../places/home/HomeState'

export interface AppState {
  home: HomeState
}

export const initialAppState: AppState = {
  home: initialHomeState
}
