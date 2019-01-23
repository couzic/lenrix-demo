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
      enteredBeerDetailPage: { beerId: string }
      beerFetched: Beer
    }>()
    .updates(_ => ({
      enteredBeerDetailPage: () => _.setFields({ pending: true }),
      beerFetched: beer => _.setFields({ pending: false, beer })
    }))
    .pureEpics({
      enteredBeerDetailPage: pipe(
        switchMap(({ beerId }) => beerService.fetchBeer(beerId)),
        map(beer => ({ beerFetched: beer }))
      )
    })

  router.beer.detail.match$
    .pipe(
      filter(Boolean),
      map(match => match.params.beerId)
    )
    .subscribe(beerId => store.dispatch({ enteredBeerDetailPage: { beerId } }))
  return store
}

export type BeerDetailStore = ReturnType<typeof createBeerDetailStore>
