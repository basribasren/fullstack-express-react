import { combineReducers } from 'redux'
import reducerLayout from './reducerLayout'
import reducerLogin from './reducerLogin'
import reducerSnackbar from './reducerSnackbar'

const rootReducer = combineReducers({
	layout: reducerLayout,
	login: reducerLogin,
	snackbar: reducerSnackbar,
})

export default rootReducer
