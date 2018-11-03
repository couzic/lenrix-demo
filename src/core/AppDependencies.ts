import { createBrowserHistory } from 'history'

export const createProductionDependencies = () => {
  const history = createBrowserHistory()
  return { history }
}

export type AppDependencies = ReturnType<typeof createProductionDependencies>
