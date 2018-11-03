import { createFocusableStore } from 'lenrix'

import { AppState, initialAppState } from './AppState'

export const createAppStore = () =>
  createFocusableStore(
    (state: AppState | undefined) => state || initialAppState,
    initialAppState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )

export type AppStore = ReturnType<typeof createAppStore>
