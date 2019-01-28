import chai from 'chai'
import { ImmediateScheduler } from 'lenrix'
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

describe('BeerSearchStore (Immediate Time)', () => {
  let store: BeerSearchStore
  let beerService: BeerService
  let receivedResults$: Subject<Beer[]>
  beforeEach(() => {
    const dependencies = createTestDependencies({
      scheduler: new ImmediateScheduler()
    })
    receivedResults$ = new Subject()
    beerService = dependencies.beerService
    beerService.searchBeers = stub().returns(receivedResults$)
    const core = createCore(dependencies)
    store = core.beer.search.store
  })

  it('initially is NOT pending', () => {
    expect(store.currentState.pending).to.be.false
  })

  describe('when search input value changes', () => {
    const inputValue = 'b'
    beforeEach(() => {
      store.dispatch({ searchInputValueChanged: inputValue })
    })
    it('is pending', () => {
      expect(store.currentState.pending).to.be.true
    })
    it('fetches search results', () => {
      expect(beerService.searchBeers).to.have.been.calledOnceWithExactly(
        inputValue
      )
    })
    describe('when search results are received', () => {
      const results: Beer[] = [{} as any]
      beforeEach(() => {
        receivedResults$.next(results)
      })
      it('is NOT pending anymore', () => {
        expect(store.currentState.pending).to.be.false
      })
      it('store results', () => {
        expect(store.currentState.results).to.equal(results)
      })
      describe('when search input is cleared', () => {
        beforeEach(() => {
          ;(beerService.searchBeers as SinonStub).resetHistory()
          store.dispatch({ searchInputValueChanged: '' })
        })
        it('does NOT fetch search results', () => {
          expect(beerService.searchBeers).not.to.have.been.called
        })
        it('is NOT pending', () => {
          expect(store.currentState.pending).to.be.false
        })
        it('clears results', () => {
          expect(store.currentState.results).to.be.empty
        })
      })
    })
    describe('when search input is cleared before results are received', () => {
      beforeEach(() => {
        store.dispatch({ searchInputValueChanged: '' })
        receivedResults$.next([{} as any])
      })
      it('ignores results', () => {
        expect(store.currentState.pending).to.be.false
        expect(store.currentState.results).to.be.empty
      })
    })
  })
})

describe('BeerSearchStore (Virtual Time)', () => {
  let scheduler: VirtualTimeScheduler
  let store: BeerSearchStore
  let beerService: BeerService
  let receivedResults$: Subject<Beer[]>
  beforeEach(() => {
    scheduler = new VirtualTimeScheduler()
    const dependencies = createTestDependencies({ scheduler })
    receivedResults$ = new Subject()
    beerService = dependencies.beerService
    beerService.searchBeers = stub().returns(receivedResults$)
    const core = createCore(dependencies)
    store = core.beer.search.store
  })
  describe('when many characters are typed quickly', () => {
    beforeEach(() => {
      store.dispatch({ searchInputValueChanged: 'b' })
      store.dispatch({ searchInputValueChanged: 'bl' })
      store.dispatch({ searchInputValueChanged: 'blo' })
      store.dispatch({ searchInputValueChanged: 'blon' })
      store.dispatch({ searchInputValueChanged: 'blond' })
      scheduler.flush()
    })
    it('fetches search results ONCE ONLY', () => {
      expect(beerService.searchBeers).to.have.been.calledOnceWithExactly(
        'blond'
      )
    })
  })
})
