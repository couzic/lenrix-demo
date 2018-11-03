import { createHomeStore } from '../places/home/HomeStore'
import { AppDependencies } from './AppDependencies'
import { createAppStore } from './AppStore'
import { createRouter } from './Router'

export const createAppCore = (dependencies: AppDependencies) => {
  const router = createRouter(dependencies.history)
  const appStore = createAppStore()
  const home = { store: createHomeStore(appStore) }
  return { router, appStore, home }
}

export type AppCore = ReturnType<typeof createAppCore>
