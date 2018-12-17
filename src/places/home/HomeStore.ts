import { pipe, Scheduler } from 'rxjs'
import { debounceTime, filter, map, switchMap } from 'rxjs/operators'

import { AppStore } from '../../core/AppStore'
import { BeerService } from '../../core/ports/BeerService'
import { Beer } from '../../domain/Beer'

export const createHomeStore = (
  appStore: AppStore,
  beerService: BeerService,
  scheduler?: Scheduler
) =>
  appStore
    .focusPath('home')
    .actionTypes<{
      searchInputValueChanged: string
      searchBeerName: string
      receivedBeers: Beer[]
    }>()
    .updates(_ => ({
      searchInputValueChanged: _.focusPath('searchInputValue').setValue(),
      searchBeerName: name =>
        name.length > 0
          ? _.focusPath('loading').setValue(true)
          : _.setFields({
              loading: false,
              beers: []
            }),
      receivedBeers: beers => _.setFields({ loading: false, beers })
    }))
    .epics({
      searchInputValueChanged: map(name => ({ searchBeerName: name })),
      searchBeerName: pipe(
        debounceTime(500, scheduler),
        filter(name => name.length > 0),
        switchMap(name => beerService.searchBeers(name)),
        map(beers => ({ receivedBeers: beers }))
      )
    })

export type HomeStore = ReturnType<typeof createHomeStore>
