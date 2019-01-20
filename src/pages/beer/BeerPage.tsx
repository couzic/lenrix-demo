import React from 'react'

import { BeerDetail } from './detail/BeerDetail'
import { BeerSearch } from './search/BeerSearch'

export const BeerPage: React.FC = () => (
  <div className="BeerPage">
    <BeerSearch />
    <BeerDetail />
  </div>
)
