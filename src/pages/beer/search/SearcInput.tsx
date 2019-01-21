import React from 'react'

import { core } from '../../../core'

const { store } = core.beer.search

const onValueChange = (e: any) =>
  store.dispatch({ searchInputChanged: e.target.value })

export const SearchInput = () => (
  <div className="Search">
    <input
      type="text"
      placeholder="Search for a Beer"
      onChange={onValueChange}
    />
  </div>
)
