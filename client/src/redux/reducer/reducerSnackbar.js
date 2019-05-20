import {
	SHOW_SNACKBAR,
	CLOSE_SNACKBAR,
} from 'redux/constants'

const initialState = {
	isSnackbarOpen: false,
	icon: '',
	message: '',
}

export default function(state = initialState, action) {
	switch (action.type) {
		case SHOW_SNACKBAR:
			return {
				...state,
				isSnackbarOpen: true,
				icon: action.payload.icon,
				message: action.payload.message,
			}
		case CLOSE_SNACKBAR:
			return {
				...state,
				isSnackbarOpen: false,
				icon: action.payload.icon,
				message: action.payload.message,
			}
		default:
			return state
	}
}
