import chai from 'chai'
import { Subject, VirtualTimeScheduler } from 'rxjs'
import { SinonStub, stub } from 'sinon'
import sinonChai from 'sinon-chai'

import { createTestDependencies } from '../../../adapters/test/createTestDependencies'
import { createCore } from '../../../core/Core'
import { BeerService } from '../../../core/ports/BeerService'
import { Beer } from '../../../domain/Beer'
import { BeerSearchStore } from './BeerSearchStore'

chai.use(sinonChai)
const { expect } = chai

describe('BeerSearchStore', () => {
  let beerService: BeerService
  let store: BeerSearchStore
  beforeEach(() => {
    const dependencies = createTestDependencies()
    const core = createCore(dependencies)
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
          expect(store.currentState.beers).to.be.empty
        })
        it('does NOT fetch search results', () => {
          expect(beerService.searchBeers).not.to.have.been.called
        })
      })
    })
    describe('when search input is cleared before results are received', () => {
      beforeEach(() => {
        store.dispatch({ searchInputChanged: '' })
        receivedBeers$.next([{} as any])
      })
      it('clears results', () => {
        expect(store.currentState.beers).to.be.empty
      })
      it('is not pending', () => {
        expect(store.currentState.pending).to.be.false
      })
    })
  })
})

describe('BeerSearchStore (Virtual Time)', () => {
  let scheduler: VirtualTimeScheduler
  let beerService: BeerService
  let store: BeerSearchStore
  beforeEach(() => {
    scheduler = new VirtualTimeScheduler()
    const dependencies = createTestDependencies({ scheduler })
    const core = createCore(dependencies)
    beerService = dependencies.beerService
    store = core.beer.search.store
  })
  it('debounces input changes', () => {
    beerService.searchBeers = stub()
    store.dispatch({ searchInputChanged: 'b' })
    store.dispatch({ searchInputChanged: 'bl' })
    store.dispatch({ searchInputChanged: 'blo' })
    store.dispatch({ searchInputChanged: 'blon' })
    store.dispatch({ searchInputChanged: 'blond' })
    scheduler.flush()

    expect(beerService.searchBeers).to.have.been.calledOnceWithExactly('blond')
  })
})
