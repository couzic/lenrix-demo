import chai from 'chai'
import { createMemoryHistory } from 'history'
import { never, Subject } from 'rxjs'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'

import { createAppCore } from '../../core/AppCore'
import { BeerService } from '../../core/ports/BeerService'
import { Router } from '../../core/Router'
import { Beer } from '../../domain/Beer'
import { BeerDetailStore } from './BeerDetailStore'

chai.use(sinonChai)
const { expect } = chai

describe('BeerDetailStore', () => {
  let store: BeerDetailStore
  let router: Router
  let beerService: BeerService
  beforeEach(() => {
    const history = createMemoryHistory()
    beerService = {} as any
    const core = createAppCore({ history, beerService })
    store = core.beerDetail.store
    router = core.router
  })
  it('has initial state', () => {
    expect(store.currentState).to.deep.equal({
      loading: false
    })
  })
  describe('when entered route with valid beer id', () => {
    const beerId = '1'
    let fetchedBeer$: Subject<Beer>
    beforeEach(() => {
      fetchedBeer$ = new Subject()
      beerService.fetchBeer = stub().returns(fetchedBeer$)
      router.beer.push({ beerId })
    })
    it('fetches beer', () => {
      expect(beerService.fetchBeer).to.have.been.calledOnceWithExactly(beerId)
    })
    it('is loading', () => {
      expect(store.currentState.loading).to.be.true
    })
    describe('when received beer', () => {
      const fetchedBeer: Beer = {
        id: beerId
      } as any
      beforeEach(() => {
        fetchedBeer$.next(fetchedBeer)
      })
      it('stores fetched beer', () => {
        expect(store.currentState.beer).to.equal(fetchedBeer)
      })
      it('is NOT loading', () => {
        expect(store.currentState.loading).to.be.false
      })
      describe('when navigate to other beer', () => {
        const otherBeerId = '2'
        beforeEach(() => {
          beerService.fetchBeer = () => never()
          router.beer.push({ beerId: otherBeerId })
        })
        it('clears current beer', () => {
          expect(store.currentState.beer).to.be.undefined
        })
      })
    })
  })
})
