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
  return { router, appStore, home }
}

export type AppCore = ReturnType<typeof createAppCore>
