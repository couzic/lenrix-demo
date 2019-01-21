import chai from 'chai'
import { Subject } from 'rxjs'
import { SinonStub, stub } from 'sinon'
import sinonChai from 'sinon-chai'

import { createTestDependencies } from '../../../adapters/test/createTestDependencies'
import { createCore } from '../../../core/Core'
import { BeerService } from '../../../core/ports/BeerService'
import { Router } from '../../../core/Router'
import { Beer } from '../../../domain/Beer'
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
    let receivedBeers$: Subject<Beer[]>
    beforeEach(() => {
      receivedBeers$ = new Subject()
      beerService.searchBeers = stub().returns(receivedBeers$)
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
    describe('when search results received', () => {
      const beers: Beer[] = [{}] as any
      beforeEach(() => {
        receivedBeers$.next(beers)
      })
      it('stores received beers', () => {
        expect(store.currentState.beers).to.equal(beers)
      })
      it('is not pending anymore', () => {
        expect(store.currentState.pending).to.be.false
      })
      describe('when search input is cleared', () => {
        beforeEach(() => {
          ;(beerService.searchBeers as SinonStub).resetHistory()
          store.dispatch({ searchInputChanged: '' })
        })
        it('clears results', () => {
          expect(store.currentState.beers).to.be.undefined
        })
        it('does NOT fetch search results', () => {
          expect(beerService.searchBeers).not.to.have.been.called
        })
      })
    })
  })
})
