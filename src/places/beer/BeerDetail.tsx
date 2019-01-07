import React from 'react'

import { core } from '../../core'
import { Route } from '../../core/Route'

export const BeerDetail = () => (
  <Route matchRouter={core.router.beer} exact>
    <h3 className="Search">{`<< Back to Search`}</h3>
    <div className="Content">
      <React.Fragment>
        <h3>Beer Name</h3>
        ... Beer details
      </React.Fragment>
    </div>
  </Route>
)
