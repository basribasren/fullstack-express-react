import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// core components/views
import PageLogin from 'views/PageLogin/PageLogin'

const publicSwitch = (
	<Switch>
		<Route path='/login' component={PageLogin} />	
		<Redirect from='/' to='/login' />
	</Switch>
)

export default publicSwitch
