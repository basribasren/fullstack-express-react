import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import indexRoutes from 'routes/index'
import configureStore from 'redux/store/store'

const { store, persistor } = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Router>
				<Switch>
					{indexRoutes.map((prop, key) => {
						return (
							<Route
								path={prop.path}
								component={prop.component}
								key={key}
							/>
						)
					})}
				</Switch>
			</Router>,
		</PersistGate>
	</Provider>,
	document.getElementById('app')
)
