import { createMemoryHistory } from 'history'
import { never } from 'rxjs'

import { CoreDependencies } from '../../core/CoreDependencies'
import { createRouter } from '../../core/Router'
import { ImmediateScheduler } from './ImmediateScheduler'

export const createTestDependencies = (
  dependencies: Partial<CoreDependencies> = {}
): CoreDependencies => {
  const router = createRouter(createMemoryHistory())

  return {
    router,
    scheduler: new ImmediateScheduler(),
    beerService: {
      searchBeers: never,
      fetchBeer: never
    },
    ...dependencies
  }
}
