import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import 'styles/_globals.scss'

export default (store) => {
  return (
    <Route path='/'>
      <IndexRedirect to='guess' />
      <Route path='guess' store={store} component={require('react-router-proxy?name=guess!views/HomeView')} />
      <Route path='*' component={require('react-router-proxy?name=all!views/ForbiddenView')} status={404} />
    </Route>
  )
}
