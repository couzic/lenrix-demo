import { AppStore } from '../../../core/AppStore'

export const createBeerDetailStore = (appStore: AppStore) => appStore

export type BeerDetailStore = ReturnType<typeof createBeerDetailStore>
