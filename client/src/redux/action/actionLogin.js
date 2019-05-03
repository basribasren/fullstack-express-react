import {
	DO_LOGIN,
	DO_LOGOUT
} from 'redux/constants'

import axios from 'axios'

export const login = (username, password) => dispatch => {
	return axios
		.request({
			method: 'post',
			url: process.env.API_PATH + 'api/accounts/login?include=user',
			data: {
				username: username,
				password: password
			}
		})
		.then(response => {
			dispatch({
				type: DO_LOGIN,
				payload: response.data
			})
			return response.data
		})
		.catch(error => {
			return error
		})
}

export const logout = access_token => dispatch =>{
	return axios
		.request({
			method: 'post',
			url: process.env.API_PATH + `api/accounts/logout?access_token=${access_token}`
		})
		.then(response => {
			dispatch({
				type: DO_LOGOUT,
			})
			return response
		})
		.catch(error => {
			return error
		})
}
