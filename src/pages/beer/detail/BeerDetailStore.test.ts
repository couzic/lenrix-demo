import chai from 'chai'
import { never, Subject } from 'rxjs'
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
  let received$: Subject<Beer>
  beforeEach(() => {
    const dependencies = createTestDependencies()
    beerService = dependencies.beerService
    received$ = new Subject()
    beerService.fetchBeer = stub().returns(received$)
    const core = createCore(dependencies)
    store = core.beer.detail.store
    router = core.router
  })

  describe('when entered beer detail page', () => {
    const beerId: Beer['id'] = '1'
    beforeEach(() => {
      router.beer.detail.push({ beerId })
    })
    it('is pending', () => {
      expect(store.currentState.pending).to.be.true
    })
    it('fetches beer details', () => {
      expect(beerService.fetchBeer).to.have.been.calledOnceWithExactly(beerId)
    })
    describe('when received beer', () => {
      const beer: Beer = {} as any
      beforeEach(() => {
        received$.next(beer)
      })
      it('is NOT pending anymore', () => {
        expect(store.currentState.pending).to.be.false
      })
      it('stores beer', () => {
        expect(store.currentState.beer).to.equal(beer)
      })
    })
  })
})
