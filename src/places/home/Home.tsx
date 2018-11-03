import React from 'react'

import { core } from '../../core'
import { Route } from '../../core/Route'
import { BeerList } from './BeerList'
import { Search } from './Search'

export const Home: React.SFC = () => (
  <Route matchRouter={core.router.home} exact>
    <Search />
    <BeerList />
  </Route>
)
