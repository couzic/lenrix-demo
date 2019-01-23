import chai from 'chai'
import sinonChai from 'sinon-chai'

import { createTestDependencies } from '../../../adapters/test/createTestDependencies'
import { createCore } from '../../../core/Core'
import { BeerDetailStore } from './BeerDetailStore'

chai.use(sinonChai)
const { expect } = chai

describe('BeerDetailStore', () => {
  let store: BeerDetailStore
  beforeEach(() => {
    const dependencies = createTestDependencies()
    const core = createCore(dependencies)
    store = core.beer.detail.store
  })
})
