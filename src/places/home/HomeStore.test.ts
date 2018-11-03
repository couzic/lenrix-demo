import { expect } from 'chai'
import { createMemoryHistory } from 'history'

import { createAppCore } from '../../core/AppCore'
import { HomeStore } from './HomeStore'

describe('HomeStore', () => {
  let store: HomeStore
  beforeEach(() => {
    const history = createMemoryHistory()
    const appCore = createAppCore({ history })
    store = appCore.home.store
  })
  it('has initial state', () => {
    expect(store.currentState).to.deep.equal({
      searchInputValue: '',
      searching: false,
      results: []
    })
  })
})
