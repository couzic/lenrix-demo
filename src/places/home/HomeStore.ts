import { AppStore } from '../../core/AppStore'

export const createHomeStore = (appStore: AppStore) => appStore

export type HomeStore = ReturnType<typeof createHomeStore>
