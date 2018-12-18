import { createBeerDetailStore } from '../places/beer/BeerDetailStore'
import { createHomeStore } from '../places/home/HomeStore'
import { AppDependencies } from './AppDependencies'
import { createAppStore } from './AppStore'
import { createRouter } from './Router'

export const createAppCore = ({
  history,
  beerService,
  scheduler
}: AppDependencies) => {
  const router = createRouter(history)
  const appStore = createAppStore()
  const home = { store: createHomeStore(appStore, beerService, scheduler) }
  const beerDetail = {
    store: createBeerDetailStore(appStore, router, beerService)
  }
  return { router, appStore, home, beerDetail }
}

export type AppCore = ReturnType<typeof createAppCore>
