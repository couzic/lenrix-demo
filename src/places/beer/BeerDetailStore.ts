import { onLoad } from 'lenrix'
import { pipe } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'

import { AppStore } from '../../core/AppStore'
import { BeerService } from '../../core/ports/BeerService'
import { Router } from '../../core/Router'
import { Beer } from '../../domain/Beer'

export const createBeerDetailStore = (
  appStore: AppStore,
  router: Router,
  beerService: BeerService
) => {
  const store = appStore
    .focusPath('beerDetail')
    .actionTypes<{
      loadBeer: Beer['id']
      beerLoaded: Beer | undefined
    }>()
    .epics({
      loadBeer: pipe(
        switchMap(beerId => beerService.fetchBeer(beerId)),
        map(beer => ({ beerLoaded: beer }))
      )
    })
    .updates(_ => ({
      loadBeer: () =>
        _.setFields({
          loading: true,
          beer: undefined
        }),
      beerLoaded: beer =>
        _.setFields({
          loading: false,
          beer
        })
    }))

  onLoad(() => {
    router.beer.match$
      .pipe(
        filter(Boolean),
        map(({ params }) => params.beerId)
      )
      .subscribe(beerId => store.dispatch({ loadBeer: beerId }))
  })

  return store
}

export type BeerDetailStore = ReturnType<typeof createBeerDetailStore>
