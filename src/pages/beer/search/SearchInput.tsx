import React from 'react'

import { core } from '../../../core'

const { store } = core.beer.search

const onInputValueChanged = (e: any) =>
  store.dispatch({ searchInputValueChanged: e.target.value })

export const SearchInput = () => (
  <div className="Search">
    <input
      type="text"
      placeholder="Search for a Beer"
      onChange={onInputValueChanged}
    />
  </div>
)
