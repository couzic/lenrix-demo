import chai from 'chai'
import sinonChai from 'sinon-chai'

import { createTestDependencies } from '../../../adapters/test/createTestDependencies'
import { createCore } from '../../../core/Core'
import { BeerSearchStore } from './BeerSearchStore'

chai.use(sinonChai)
const { expect } = chai

describe('BeerSearchStore', () => {
  let store: BeerSearchStore
  beforeEach(() => {
    const dependencies = createTestDependencies()
    const core = createCore(dependencies)
    store = core.beer.search.store
  })
})
