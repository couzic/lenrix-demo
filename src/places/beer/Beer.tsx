import React from 'react'

import { core } from '../../core'
import { Route } from '../../core/Route'

export const Beer: React.SFC = () => (
  <Route matchRouter={core.router.beer} exact>
    <h1>Beer</h1>
  </Route>
)
