import { pipe } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

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
      searchResultsLoaded: Beer[]
    }>()
    .updates(_ => ({
      searchInputChanged: value => _.setFields({ pending: true })
    }))
    .epics({
      searchInputChanged: pipe(
        switchMap(inputValue => beerService.searchBeers(inputValue)),
        map(beers => ({ searchResultsLoaded: beers }))
      )
    })

export type BeerSearchStore = ReturnType<typeof createBeerSearchStore>
