import {
	DO_LOGIN,
	DO_LOGOUT,
} from 'redux/constants'

import axios from 'axios'

export const login = (username, password) => dispatch => {
	return axios
		.request({
			method: 'post',
			url: process.env.API_PATH + 'auth/sign-in',
			data: {
				username: username,
				password: password,
			}
		})
		.then(response => {
			dispatch({
				type: DO_LOGIN,
				token: response.data.data.token,
				account: response.data.data.account,
			})
			return response.data.data
		})
		.catch(error => {
			throw new Error(error)
		})
}

export const logout = access_token => dispatch => {
	// return axios
	// 	.request({
	// 		method: 'post',
	// 		url: process.env.API_PATH + `auth/logout?access_token=${access_token}`
	// 	})
	// 	.then(response => {
	// 		dispatch({
	// 			type: DO_LOGOUT,
	// 		})
	// 		return response
	// 	})
	// 	.catch(error => {
	// 		return error
	// 	})
	return dispatch({
		type: DO_LOGOUT,
	})
}
