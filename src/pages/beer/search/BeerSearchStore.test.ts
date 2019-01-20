import chai from 'chai'
import { of } from 'rxjs'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'

import { createTestDependencies } from '../../../adapters/test/createTestDependencies'
import { createCore } from '../../../core/Core'
import { BeerService } from '../../../core/ports/BeerService'
import { Router } from '../../../core/Router'
import { BeerSearchStore } from './BeerSearchStore'

chai.use(sinonChai)
const { expect } = chai

describe('BeerSearchStore', () => {
  let router: Router
  let beerService: BeerService
  let store: BeerSearchStore
  beforeEach(() => {
    const dependencies = createTestDependencies()
    const core = createCore(dependencies)
    router = core.router
    beerService = dependencies.beerService
    store = core.beer.search.store
  })
  it('is initially NOT pending', () => {
    expect(store.currentState.pending).to.be.false
  })
  describe('when search input value changes', () => {
    const newValue = 'newValue'
    beforeEach(() => {
      beerService.searchBeers = stub().returns(of(undefined))
      store.dispatch({ searchInputChanged: newValue })
    })
    it('is pending', () => {
      expect(store.currentState.pending).to.be.true
    })
    it('fetches search results', () => {
      expect(beerService.searchBeers).to.have.been.calledOnceWithExactly(
        newValue
      )
    })
  })
})
