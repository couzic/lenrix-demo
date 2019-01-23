import { AppStore } from '../../../core/AppStore'
import { CoreDependencies } from '../../../core/CoreDependencies'

export const createBeerDetailStore = (
  appStore: AppStore,
  dependencies: CoreDependencies
) => appStore

export type BeerDetailStore = ReturnType<typeof createBeerDetailStore>
