import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// core components/views
import PageProfile from 'views/PageProfile/PageProfile'

const adminSwitch = (
	<Switch>
		<Route path='/profile' component={PageProfile} />	
		<Redirect from='/' to='/profile' />
	</Switch>
)

export default adminSwitch
