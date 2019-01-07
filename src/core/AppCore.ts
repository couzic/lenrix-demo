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
  return { router, appStore }
}

export type AppCore = ReturnType<typeof createAppCore>
