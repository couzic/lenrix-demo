import { createMemoryHistory } from 'history'
import { never } from 'rxjs'

import { CoreDependencies } from '../../core/CoreDependencies'
import { ImmediateScheduler } from './ImmediateScheduler'

export const createTestDependencies = (
  dependencies: Partial<CoreDependencies> = {}
): CoreDependencies => {
  const history = createMemoryHistory()

  return {
    history,
    scheduler: new ImmediateScheduler(),
    beerService: {
      searchBeers: never,
      fetchBeer: never
    },
    ...dependencies
  }
}
