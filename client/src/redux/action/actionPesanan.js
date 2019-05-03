import {
	GET_NOMOR_PESANAN,
	GET_LIST_PESANAN,
	GET_ITEM_PESANAN,
	CREATE_PESANAN,
	UPDATE_PESANAN,
	DELETE_PESANAN
} from 'redux/constants'

import axios from 'axios'


function handleTwoDigit(number) {
	return (number < 10) ? '0' + number.toString() : number.toString()
}
function handleThreeDigit(number) {
	return (number < 100) ? '00' + number.toString() : number.toString()
}

export const get_nomor_pesanan = (access_token) => dispatch => {
	const newDate = new Date()
	let date = handleTwoDigit(newDate.getDate())
	let month = handleTwoDigit(newDate.getMonth()+1)
	let year = handleTwoDigit(newDate.getFullYear())
	let nowDate = newDate.toDateString()
	return axios
		.get(process.env.API_PATH + `api/pesanans/count?filter[where][date_created]=${nowDate}&access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_NOMOR_PESANAN,
				payload: response.data
			})
			return response.data.count + 1
		})
		.then(number => {
			const nomor = handleThreeDigit(number)
			const nomor_pesanan = `ERP${date}${month}${year}-${nomor}`
			// console.log(nomor_pesanan)
			return nomor_pesanan
		})
		.catch(error => {
			return error
		})
}

export const get_list_pesanan = (access_token) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/pesanans?filter[where][status_pesanan]=aktif&access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_LIST_PESANAN,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const get_item_pesanan = (access_token, id_pesanan) => dispatch => {
	return axios
		.get(process.env.API_PATH + `api/pesanans/${id_pesanan}?access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: GET_ITEM_PESANAN,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const create_pesanan = (access_token, data) => dispatch => {
	return axios
		.request({
			method: 'post',
			url: process.env.API_PATH + `api/pesanans?access_token=${access_token}`,
			data: data
		})
		.then(response => {
			dispatch({
				type: CREATE_PESANAN,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const update_pesanan = (access_token, id_pesanan, data) => dispatch => {
	return axios
		.request({
			method: 'put',
			url: process.env.API_PATH + `api/pesanans/${id_pesanan}?access_token=${access_token}`,
			data: data
		})
		.then(response => {
			dispatch({
				type: UPDATE_PESANAN,
				payload: response.data
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const delete_pesanan = (access_token, id_pesanan) => dispatch => {
	return axios
		.delete(process.env.API_PATH + `api/pesanans/${id_pesanan}?access_token=${access_token}`)
		.then(response => {
			dispatch({
				type: DELETE_PESANAN,
			})
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}

export const close_pesanan = (authentication, id_pesanan, data) => dispatch => {
	const newDate = new Date()
	
	const pesanan = {
		nama_pelanggan: data.nama_pelanggan,
		nomor_pesanan: data.nomor_pesanan,
		status_pesanan: 'closed',
		nomor_meja: data.nomor_meja,
		total_harga: data.total_harga,
		daftar_pesanan: data.daftar_pesanan,
		id_kasir: authentication.id_account,
		id_pelayan: data.id_pelayan,
		date_created: data.date_created,
		date_update: newDate
	}
	return axios
		.request({
			method: 'put',
			url: process.env.API_PATH + `api/pesanans/${id_pesanan}?access_token=${authentication.token}`,
			data: pesanan
		})
		.then(response => {
			dispatch({
				type: UPDATE_PESANAN,
				payload: response.data
			})
			// console.log(response.data)
			return response.data
		})
		// .catch(error => {
		// 	return error
		// })
}
