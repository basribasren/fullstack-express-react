import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// core components/views
import PageLogin from 'views/PageLogin/PageLogin'
import PageProfile from 'views/PageProfile/PageProfile'

const publicSwitch = (
	<Switch>
		<Route path='/login' component={PageLogin} />	
		<Route path='/profile' component={PageProfile} />	
		<Redirect from='/' to='/login' />
	</Switch>
)

export default publicSwitch
