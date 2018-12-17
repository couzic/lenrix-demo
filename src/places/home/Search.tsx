import React from 'react'
import { componentFromStream } from 'recompose'
import { map } from 'rxjs/operators'

import { core } from '../../core'
import { Message } from '../../domain/Message'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
const { store } = core.home

const onSearchInputValueChanged = (event: ChangeEvent) =>
  store.dispatch({ searchInputValueChanged: event.target.value })

const messages: Message[] = []
const loading = false
const cancel = () => console.log('cancel')

const component$ = store.pick('searchInputValue').pipe(
  map(({ searchInputValue }) => (
    <div className="Search">
      <input
        type="text"
        placeholder="Search for a Beer"
        value={searchInputValue}
        onChange={onSearchInputValueChanged}
      />
      {loading && (
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      )}
      {messages.length > 0 && (
        <ul>
          {messages.map(message => (
            <li
              key={message.text}
              className={`Message Message--${message.type}`}
            >
              {message.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  ))
)

export const Search = componentFromStream(() => component$)
