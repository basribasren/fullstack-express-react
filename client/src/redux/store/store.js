import localforage from 'localforage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

import rootReducer from '../reducer'

export default function configureStore(initialState) {
	localforage.config({
		driver: localforage.INDEXEDDB,
		name: 'boilerplate-redux-store',
	})
	// choose driver and set name for localforage
	const persistConfig = {
		key: 'root',
		storage: localforage,
		stateReconciler: autoMergeLevel2,
	}
	// setting local storage that used
	const persistedReducer = persistReducer(persistConfig, rootReducer)
	// implement localforage to reducer
	const middlewares = [thunkMiddleware]

	if (process.env.NODE_ENV === 'development') {
		middlewares.push(logger)
	}
	// using logger and thunk middleware if development mode
	const middlewareEnhancer = composeWithDevTools(
		applyMiddleware(...middlewares)
	)
	// using redux dev-tools
	const store = createStore(
		persistedReducer,
		initialState,
		middlewareEnhancer
	)
	// create store
	const persistor = persistStore(store)
	// create persistor
	return { store, persistor }
	// return store and persistor
}
