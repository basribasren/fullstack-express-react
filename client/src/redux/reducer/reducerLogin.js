import {
	DO_LOGIN,
	DO_LOGOUT
} from 'redux/constants'

const initialState = {
	id_account: '',
	date_create: '',
	token: '',
	expired: 0,
	username: '',
	role: '',
	isAuthenticated: false
}

export default function(state = initialState, action) {
	switch (action.type) {

		case DO_LOGIN:
			return {
				...state,
				token: action.token,
				id_account: action.account._id,
				date_create: action.account.created_at,
				// expired: action.account.ttl,
				username: action.account.username,
				role: action.account.role,
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
