import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { setObservableConfig } from 'recompose'
import { from, Observable } from 'rxjs'

import App from './App'

setObservableConfig({
  fromESObservable: from as any,
  toESObservable: (stream: Observable<any>) => stream
})

ReactDOM.render(<App />, document.getElementById('root'))
