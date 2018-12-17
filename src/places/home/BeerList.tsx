import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../core'

const { store } = core.home

const component$ = store.pick('loading', 'beers').pipe(
  map(({ loading, beers }) => (
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
  ))
)

export const BeerList = componentFromStream(() => component$)
