import React from 'react'

import { core } from '../../../core'
import { Route } from '../../../util/Route'

export const BeerDetail = () => (
  <Route matchRouter={core.router.beer.detail} exact>
    <h3 className="Search">{`<< Back to Search`}</h3>
    <div className="Content">
      <h3>Beer Name</h3>
    </div>
  </Route>
)
