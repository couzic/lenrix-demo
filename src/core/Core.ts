import { createBeerDetailStore } from '../pages/beer/detail/BeerDetailStore'
import { createBeerSearchStore } from '../pages/beer/search/BeerSearchStore'
import { createAppStore } from './AppStore'
import { CoreDependencies } from './CoreDependencies'
import { createRouter } from './Router'

export const createCore = (dependencies: CoreDependencies) => {
  const { history, beerService, scheduler } = dependencies
  const router = createRouter(history)
  const appStore = createAppStore()
  const beer = {
    search: { store: createBeerSearchStore(appStore, dependencies) },
    detail: { store: createBeerDetailStore(appStore) }
  }
  return { router, appStore, beer }
}

export type Core = ReturnType<typeof createCore>