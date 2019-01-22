import { pipe } from 'rxjs'
import { filter, map, mapTo, switchMap, takeUntil } from 'rxjs/operators'

import { AppStore } from '../../../core/AppStore'
import { CoreDependencies } from '../../../core/CoreDependencies'
import { Beer } from '../../../domain/Beer'

export const createBeerSearchStore = (
  appStore: AppStore,
  { beerService }: CoreDependencies
) =>
  appStore
    .focusPath('beer', 'search')
    .actionTypes<{
      searchInputChanged: string
      receivedBeers: Beer[]
      cancelBeerSearch: undefined
    }>()
    .updates(_ => ({
      searchInputChanged: value => _.setFields({ pending: true }),
      receivedBeers: beers => _.setFields({ pending: false, beers }),
      cancelBeerSearch: () => _.setFields({ pending: false, beers: [] })
    }))
    .epics({
      searchInputChanged: pipe(
        filter(value => value === ''),
        mapTo({ cancelBeerSearch: undefined })
      )
    })
    .epics({
      searchInputChanged: (inputValue$, store) =>
        inputValue$.pipe(
          filter(inputValue => inputValue.length > 0),
          switchMap(inputValue =>
            beerService
              .searchBeers(inputValue)
              .pipe(takeUntil(store.action$.ofType('cancelBeerSearch')))
          ),
          map(beers => ({ receivedBeers: beers }))
        )
    })

export type BeerSearchStore = ReturnType<typeof createBeerSearchStore>
