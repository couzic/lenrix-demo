import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../../core'
import { Beer } from '../../../domain/Beer'

const { store } = core.beer.search

const onBeerClick = (beerId: string) => () =>
  core.router.beer.detail.push({ beerId })

export const BeerList = componentFromStream(() =>
  store.pick('pending', 'beers').pipe(
    map(({ pending, beers }) => (
      <div className="Content">
        <h3>
          Search Results: ({beers.length}){' '}
          {pending && <img src="/ajax-loader.gif" />}
        </h3>
        <ul>
          {beers.map((beer: Beer) => (
            <li key={beer.id} className="Beer" onClick={onBeerClick(beer.id)}>
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
