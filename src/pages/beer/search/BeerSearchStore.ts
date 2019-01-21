import { pipe } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'

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
    }>()
    .updates(_ => ({
      searchInputChanged: value =>
        value === ''
          ? _.setFields({ beers: undefined })
          : _.setFields({ pending: true }),
      receivedBeers: beers => _.setFields({ beers, pending: false })
    }))
    .epics({
      searchInputChanged: pipe(
        filter(inputValue => inputValue.length > 0),
        switchMap(inputValue => beerService.searchBeers(inputValue)),
        map(beers => ({ receivedBeers: beers }))
      )
    })

export type BeerSearchStore = ReturnType<typeof createBeerSearchStore>
