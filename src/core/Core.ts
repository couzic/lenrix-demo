import { createBeerDetailStore } from '../pages/beer/detail/BeerDetailStore'
import { createBeerSearchStore } from '../pages/beer/search/BeerSearchStore'
import { createAppStore } from './AppStore'
import { CoreDependencies } from './CoreDependencies'

export const createCore = (dependencies: CoreDependencies) => {
  const { router } = dependencies
  const appStore = createAppStore()
  const beer = {
    search: { store: createBeerSearchStore(appStore, dependencies) },
    detail: { store: createBeerDetailStore(appStore, dependencies) }
  }
  return { router, appStore, beer }
}

export type Core = ReturnType<typeof createCore>
