import React from 'react'
import { componentFromStream } from 'recompose'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

export const Route = componentFromStream<{
  matchRouter: { match$: Observable<null | {}> }
  exact?: boolean
  children: any
}>((props$: any) =>
  props$.pipe(
    switchMap(({ matchRouter, exact, children }) =>
      matchRouter.match$.pipe(
        map((match: any) => {
          if (match === null) {
            return null
          } else if (exact) {
            return match.exact ? children : null
          } else return children
        })
      )
    )
  )
)
