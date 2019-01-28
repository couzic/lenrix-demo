import { onLoad } from 'lenrix'
import { pipe } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'

import { AppStore } from '../../../core/AppStore'
import { CoreDependencies } from '../../../core/CoreDependencies'
import { Beer } from '../../../domain/Beer'

export const createBeerDetailStore = (
  appStore: AppStore,
  { router, beerService }: CoreDependencies
) => {
  const store = appStore
    .focusPath('beer', 'detail')
    .actionTypes<{
      onBeerDetailEnter: Beer['id']
      onBeerReceived: Beer
    }>()
    .updates(lens => ({
      onBeerDetailEnter: beerId => lens.setFields({ pending: true }),
      onBeerReceived: beer => lens.setFields({ pending: false, beer })
    }))
    .pureEpics({
      onBeerDetailEnter: pipe(
        switchMap(beerId => beerService.fetchBeer(beerId)),
        map(beer => ({ onBeerReceived: beer }))
      )
    })

  onLoad(() => {
    router.beer.detail.match$
      .pipe(filter(Boolean))
      .subscribe(match =>
        store.dispatch({ onBeerDetailEnter: match.params.beerId })
      )
  })

  return store
}

export type BeerDetailStore = ReturnType<typeof createBeerDetailStore>
