import chai from 'chai'
import { createMemoryHistory } from 'history'
import { never, ReplaySubject, Subject, VirtualTimeScheduler } from 'rxjs'
import { stub, SinonStub } from 'sinon'
import sinonChai from 'sinon-chai'

import { createAppCore } from '../../core/AppCore'
import { BeerService } from '../../core/ports/BeerService'
import { Beer } from '../../domain/Beer'
import { HomeStore } from './HomeStore'
import { Router } from '../../core/Router'

chai.use(sinonChai)
const { expect } = chai

describe('HomeStore', () => {
  let store: HomeStore
  let router: Router
  let scheduler: VirtualTimeScheduler
  let beerService: BeerService
  beforeEach(() => {
    const history = createMemoryHistory()
    scheduler = new VirtualTimeScheduler()
    beerService = {} as any
    const appCore = createAppCore({ history, beerService, scheduler })
    store = appCore.home.store
    router = appCore.router
  })
  it('has initial state', () => {
    expect(store.currentState).to.deep.equal({
      searchInputValue: '',
      loading: false,
      beers: []
    })
  })
  describe('when beer name is searched', () => {
    const searchedName = 'blond'
    let receivedBeers: Subject<Beer[]>
    beforeEach(() => {
      receivedBeers = new ReplaySubject<Beer[]>()
      beerService.searchBeers = stub().returns(receivedBeers)
      store.dispatch({ searchInputValueChanged: 'b' })
      store.dispatch({ searchInputValueChanged: 'bl' })
      store.dispatch({ searchInputValueChanged: 'blo' })
      store.dispatch({ searchInputValueChanged: 'blon' })
      store.dispatch({ searchInputValueChanged: searchedName })
      scheduler.flush()
    })
    it('stores search input value', () => {
      expect(store.currentState.searchInputValue).to.equal(searchedName)
    })
    it('is in loading state', () => {
      expect(store.currentState.loading).to.be.true
    })
    it('fetches search result', () => {
      expect(beerService.searchBeers).to.have.been.calledOnceWithExactly(
        searchedName
      )
    })
    describe('when receives beer list', () => {
      const beerList: Beer[] = [
        {
          id: '1',
          name: 'Beer Name',
          image_url: 'Beer URL',
          tagline: 'Beer Tagline'
        }
      ]
      beforeEach(() => {
        receivedBeers.next(beerList)
      })
      it('stores beer list', () => {
        expect(store.currentState.loading).to.be.false
        expect(store.currentState.beers).to.equal(beerList)
      })
      describe('when beer is navigated to', () => {
        beforeEach(() => {
          router.beer.push({ beerId: '1' })
        })
        it('hides home page', () => {
          expect(router.home.isMatchingExact).to.be.false
        })
      })
      describe('when empty beer name is searched', () => {
        beforeEach(() => {
          ;(beerService.searchBeers as SinonStub).resetHistory()
          store.dispatch({ searchInputValueChanged: 'b' })
          store.dispatch({ searchInputValueChanged: '' })
          scheduler.flush()
        })
        it('does NOT search beers', () => {
          expect(beerService.searchBeers).not.to.have.been.called
          expect(store.currentState.loading).to.be.false
        })
        it('clears search results', () => {
          expect(store.currentState.beers).to.be.empty
        })
      })
    })
  })
})
