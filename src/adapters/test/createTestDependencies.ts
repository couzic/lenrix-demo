import { createMemoryHistory } from 'history'
import { never } from 'rxjs'

import { CoreDependencies } from '../../core/CoreDependencies'

export const createTestDependencies = (): CoreDependencies => {
  const history = createMemoryHistory()

  return {
    history,
    beerService: {
      searchBeers: never,
      fetchBeer: never
    }
  }
}
