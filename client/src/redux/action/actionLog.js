import {
	CREATE_LOG_AKTIVITAS,
	GET_LOG_AKTIVITAS,
	GET_LOG_PESANAN
} from 'redux/constants'

import axios from 'axios'

export const create_log = (access_token, data, keterangan) => dispatch => {
	const newDate = new Date()
	let log = {
		username: data.username,
		keterangan: keterangan,
		date_create: newDate,
		id_account: data.id_account
	}
	return axios
		.request({
			method: 'post',
			url: process.env.API_PATH + `api/logaktivitas?access_token=${access_token}`,
			data: log
		})
		.then(response => {
			dispatch({
				type: CREATE_LOG_AKTIVITAS,
				payload: response.data
			})
			return response.data
		})
		.catch(error => {
			return error
		})
}

export const get_log = (access_token, id_account) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/logaktivitas?filter[where][id_account]=${id_account}&access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_LOG_AKTIVITAS,
				payload: response.data
			})
			return response.data
		})
		.catch(error => {
			return error
		})
}

export const get_log_pesanan = (access_token, id_account, role) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/pesanans?filter[where][status_pesanan]=closed&filter[where][id_${role}]=${id_account}&access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_LOG_PESANAN,
				payload: response.data
			})
			return response.data
		})
		.catch(error => {
			return error
		})
}