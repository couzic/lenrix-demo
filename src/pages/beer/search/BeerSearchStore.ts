import { pipe } from 'rxjs'
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators'

import { AppStore } from '../../../core/AppStore'
import { CoreDependencies } from '../../../core/CoreDependencies'
import { Beer } from '../../../domain/Beer'

export const createBeerSearchStore = (
  appStore: AppStore,
  { scheduler, beerService }: CoreDependencies
) =>
  appStore
    .focusPath('beer', 'search')
    .actionTypes<{
      searchInputValueChanged: string
      searchResultsFetched: Beer[]
    }>()
    .updates(lens => ({
      searchInputValueChanged: inputValue =>
        inputValue.length === 0
          ? lens.setFields({ pending: false, results: [] })
          : lens.setFields({ pending: true }),
      searchResultsFetched: results =>
        lens.setFields({ pending: false, results })
    }))
    .epics(store => ({
      searchInputValueChanged: pipe(
        filter(inputValue => inputValue.length > 0),
        debounceTime(500, scheduler),
        switchMap(inputValue =>
          beerService
            .searchBeers(inputValue)
            .pipe(takeUntil(store.action$.ofType('searchInputValueChanged')))
        ),
        map(results => ({ searchResultsFetched: results }))
      )
    }))

export type BeerSearchStore = ReturnType<typeof createBeerSearchStore>
