import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../../core'
import { Beer } from '../../../domain/Beer'

const { store } = core.beer.search

export const BeerList = componentFromStream(() =>
  store.pick('pending', 'results').pipe(
    map(({ pending, results }) => (
      <div className="Content">
        <h3>
          Search Results: ({results.length}){' '}
          {pending && <img src="/ajax-loader.gif" />}
        </h3>
        <ul>
          {results.map((beer: Beer) => (
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
    ))
  )
)
