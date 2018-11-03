import { AppStore } from '../../core/AppStore'

export const createHomeStore = (appStore: AppStore) =>
  appStore.focusPath('home')

export type HomeStore = ReturnType<typeof createHomeStore>
