import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../core'
import { Route } from '../../core/Route'

const { store } = core.beerDetail

const backToSearch = () => core.router.home.push()

export const BeerDetail = componentFromStream(() =>
  store.pick('loading', 'beer').pipe(
    map(({ loading, beer }) => (
      <Route matchRouter={core.router.beer} exact>
        <h3 onClick={backToSearch} className="Search">{`<< Back to Search`}</h3>
        <div className="Content">
          {loading && <img src="/ajax-loader.gif" />}
          {beer && (
            <React.Fragment>
              <h3>{beer.name}</h3>
              {JSON.stringify(beer)}
            </React.Fragment>
          )}
        </div>
      </Route>
    ))
  )
)
