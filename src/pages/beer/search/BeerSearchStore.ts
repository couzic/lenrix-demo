import { AppStore } from '../../../core/AppStore'

export const createBeerSearchStore = (appStore: AppStore) => appStore

export type BeerSearchStore = ReturnType<typeof createBeerSearchStore>
