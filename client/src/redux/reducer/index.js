import { combineReducers } from 'redux'
import reducerLayout from './reducerLayout'
import reducerLogin from './reducerLogin'
import reducerLog from './reducerLog'
import reducerMenu from './reducerMenu'
import reducerPesanan from './reducerPesanan'

const rootReducer = combineReducers({
	layout: reducerLayout,
	login: reducerLogin,
	log: reducerLog,
	menu: reducerMenu,
	pesanan: reducerPesanan
})

export default rootReducer
