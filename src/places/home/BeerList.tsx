import React from 'react'

import { Beer } from '../../domain/Beer'

const beers: Beer[] = []
const loading = () => console.log('loading')

export const BeerList: React.SFC = () => {
  return (
    <div className="Beer-List">
      <h3>
        Search Results: ({beers.length}){' '}
        {loading && <img src="/ajax-loader.gif" />}
      </h3>
      {beers.length > 0 && (
        <ul>
          {beers.map(beer => (
            <li key={beer.id} className="Beer">
              <figure className="Beer-Image">
                <img src={beer.image_url} alt="" />
              </figure>
              <p>
                {beer.name} <small>{beer.tagline}</small>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
