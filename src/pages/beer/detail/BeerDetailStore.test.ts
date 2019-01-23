import chai from 'chai'
import { Subject } from 'rxjs'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'

import { createTestDependencies } from '../../../adapters/test/createTestDependencies'
import { createCore } from '../../../core/Core'
import { BeerService } from '../../../core/ports/BeerService'
import { Router } from '../../../core/Router'
import { Beer } from '../../../domain/Beer'
import { BeerDetailStore } from './BeerDetailStore'

chai.use(sinonChai)
const { expect } = chai

describe('BeerDetailStore', () => {
  let store: BeerDetailStore
  let router: Router
  let beerService: BeerService
  beforeEach(() => {
    const dependencies = createTestDependencies()
    const core = createCore(dependencies)
    store = core.beer.detail.store
    router = core.router
    beerService = dependencies.beerService
  })
  describe('when entered', () => {
    const beerId = 'beerId'
    const beer = {} as Beer
    let receivedBeer$: Subject<Beer>
    beforeEach(() => {
      receivedBeer$ = new Subject()
      beerService.fetchBeer = stub().returns(receivedBeer$)
      router.beer.detail.push({ beerId })
    })
    it('is pending', () => {
      expect(store.currentState.pending).to.be.true
    })
    it('fetches beer', () => {
      expect(beerService.fetchBeer).to.have.been.calledOnceWithExactly(beerId)
    })
    describe('when beer is received', () => {
      beforeEach(() => {
        receivedBeer$.next(beer)
      })
      it('is not pending anymore', () => {
        expect(store.currentState.pending).to.be.false
      })
      it('stores beer', () => {
        expect(store.currentState.beer).to.equal(beer)
      })
    })
  })
})
