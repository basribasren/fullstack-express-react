import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from 'redux/constants'

export const showSnackbar = (icon, message) => dispatch => {
	let data = {
		icon: icon,
		message: message,
	}
	dispatch({
		type: SHOW_SNACKBAR,
		payload: data,
	})
}

export const closeSnackbar = () => dispatch => {
	let data = {
		icon: '',
		message: '',
	}
	dispatch({
		type: CLOSE_SNACKBAR,
		payload: data,
	})
}
