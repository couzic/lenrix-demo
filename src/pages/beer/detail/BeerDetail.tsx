import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../../core'
import { Route } from '../../../core/Route'

const { store } = core.beer.detail

const backToSearch = () => core.router.beer.search.push()

export const BeerDetail = componentFromStream(() =>
  store.pick('pending', 'beer').pipe(
    map(({ pending, beer }) => (
      <Route matchRouter={core.router.beer.detail} exact>
        <h3 className="Search" onClick={backToSearch}>{`<< Back to Search`}</h3>
        <div className="Content">
          {pending || !beer ? (
            <h3>Please wait....</h3>
          ) : (
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
