import { AppStore } from '../../../core/AppStore'
import { CoreDependencies } from '../../../core/CoreDependencies'

export const createBeerSearchStore = (
  appStore: AppStore,
  dependencies: CoreDependencies
) => appStore

export type BeerSearchStore = ReturnType<typeof createBeerSearchStore>
