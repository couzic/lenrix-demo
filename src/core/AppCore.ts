import { createBrowserHistory } from 'history'

import { createAppStore } from './AppStore'
import { createRouter } from './Router'

export const createAppCore = () => {
  const history = createBrowserHistory()
  const router = createRouter(history)
  const rootStore = createAppStore()
  return { router, rootStore }
}

export type AppCore = ReturnType<typeof createAppCore>
