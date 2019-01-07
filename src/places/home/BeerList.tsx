import React from 'react'

import { Beer } from '../../domain/Beer'

export const BeerList = () => (
  <div className="Content">
    <h3>
      Search Results: (0) <img src="/ajax-loader.gif" />
    </h3>
    <ul>
      {[].map((beer: Beer) => (
        <li key={beer.id} className="Beer">
          <figure className="Beer-Image">
            <img src={beer.image_url} />
          </figure>
          <p>
            {beer.name} <small>{beer.tagline}</small>
          </p>
        </li>
      ))}
    </ul>
  </div>
)
