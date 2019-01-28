import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../../core'
import { Route } from '../../../util/Route'

const { store } = core.beer.detail

export const BeerDetail = componentFromStream(() =>
  store.pick('pending', 'beer').pipe(
    map(({ pending, beer }) => (
      <Route matchRouter={core.router.beer.detail} exact>
        <h3 className="Search">{`<< Back to Search`}</h3>
        <div className="Content">
          {pending ? (
            <h3>Please wait...</h3>
          ) : (
            <div>
              <h3>{beer && beer.name}</h3>
              {JSON.stringify(beer)}
            </div>
          )}
        </div>
      </Route>
    ))
  )
)
