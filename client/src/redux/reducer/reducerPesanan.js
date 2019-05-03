import {
	GET_NOMOR_PESANAN,
	GET_LIST_PESANAN,
	GET_ITEM_PESANAN,
	CREATE_PESANAN,
	UPDATE_PESANAN,
	DELETE_PESANAN
} from 'redux/constants'

const initialState = {
	item_pesanan:{},
	list_pesanan:[],
	nomor_pesanan: 0
}

export default function(state = initialState, action) {
	switch (action.type) {
	
	case GET_NOMOR_PESANAN:
		return {
			...state,
			item_pesanan:{},
			nomor_pesanan: action.payload
		}
	case GET_LIST_PESANAN:
		return {
			...state,
			list_pesanan: action.payload
		}
	case GET_ITEM_PESANAN:
		return {
			...state,
			item_pesanan: action.payload
		}
	case CREATE_PESANAN:
		return {
			...state,
			item_pesanan: action.payload
		}
	case UPDATE_PESANAN:
		return {
			...state,
			item_pesanan: action.payload
		}
	case DELETE_PESANAN:
		return {
			...state,
		}
	default:
		return state
	}
}
