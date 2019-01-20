import { createAppStore } from './AppStore'
import { CoreDependencies } from './CoreDependencies'
import { createRouter } from './Router'

export const createCore = ({
  history,
  beerService,
  scheduler
}: CoreDependencies) => {
  const router = createRouter(history)
  const appStore = createAppStore()
  return { router, appStore }
}

export type Core = ReturnType<typeof createCore>
