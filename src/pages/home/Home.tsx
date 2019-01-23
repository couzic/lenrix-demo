import React from 'react'

import { core } from '../../core'
import { Route } from '../../util/Route'

export const Home: React.SFC = () => (
  <Route matchRouter={core.router.home} exact>
    <h1>Welcome Home !</h1>
    <a href={core.router.beer.search.path}>Search Beers</a>
  </Route>
)
