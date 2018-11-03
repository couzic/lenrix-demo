import { createFocusableStore, createStore } from 'lenrix'

import { AppState, initialAppState } from './AppState'

export const createAppStore = () =>
  process.env.NODE_ENV === 'development'
    ? createFocusableStore(
        (state: AppState | undefined) => state || initialAppState,
        initialAppState,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )
    : createStore(initialAppState)

export type AppStore = ReturnType<typeof createAppStore>
