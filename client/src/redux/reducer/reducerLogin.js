import {
	DO_LOGIN,
	DO_LOGOUT
} from 'redux/constants'

const initialState = {
	id_account:'',
	date_create:'',
	token: '',
	expired: 0,
	username: '',
	role:'',
	isAuthenticated: false
}

export default function(state = initialState, action) {
	switch (action.type) {
	
	case DO_LOGIN:
		return {
			...state,
			id_account: action.payload.userId,
			date_create: action.payload.created,
			token: action.payload.id,
			expired: action.payload.ttl,
			username: action.payload.user.username,
			role: action.payload.user.realm,
			isAuthenticated: true
		}
	case DO_LOGOUT:
		return {
			...state,
			id_account: '',
			date_create: '',
			token: '',
			expired: 0,
			username: '',
			role: '',
			isAuthenticated: false
		}
	default:
		return state
	}
}
