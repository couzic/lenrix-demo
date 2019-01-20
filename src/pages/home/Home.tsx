import React from 'react'

import { core } from '../../core'
import { Route } from '../../core/Route'

const goToBeerSearch = () => core.router.beer.search.push()

export const Home: React.SFC = () => (
  <Route matchRouter={core.router.home} exact>
    <h1>Welcome Home !</h1>
    <button onClick={goToBeerSearch}>Search Beers</button>
  </Route>
)
