import {
	GET_LIST_MENU,
	GET_LIST_MENU_READY,
	GET_ITEM_MENU,
	CREATE_MENU,
	UPDATE_MENU,
	DELETE_MENU
} from 'redux/constants'

import axios from 'axios'

export const get_list_menu = (access_token) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/menus?access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_LIST_MENU,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const get_list_menu_ready = (access_token) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/menus?filter[where][status]=ready&access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_LIST_MENU_READY,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const get_item_menu = (access_token, id_menu) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/menus/${id_menu}?access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_ITEM_MENU,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const create_menu = (access_token, data) => dispatch => {
	return axios
		.request({
			method: 'post',
			url: process.env.API_PATH + `api/menus?access_token=${access_token}`,
			data: data
		})
		.then(response => {
			dispatch({
				type: CREATE_MENU,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const update_menu = (access_token, id_menu, data) => dispatch => {
	return axios
		.request({
			method: 'put',
			url: process.env.API_PATH + `api/menus/${id_menu}?access_token=${access_token}`,
			data: data
		})
		.then(response => {
			dispatch({
				type: UPDATE_MENU,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const delete_menu = (access_token, id_menu) => dispatch => {
	return axios
		.delete(process.env.API_PATH + `api/menus/${id_menu}?access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: DELETE_MENU,
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}