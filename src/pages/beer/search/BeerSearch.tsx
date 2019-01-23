import React from 'react'

import { core } from '../../../core'
import { Route } from '../../../util/Route'
import { BeerList } from './BeerList'
import { SearchInput } from './SearcInput'

export const BeerSearch: React.FC = () => (
  <Route matchRouter={core.router.beer.search} exact>
    <React.Fragment>
      <SearchInput />
      <BeerList />
    </React.Fragment>
  </Route>
)
