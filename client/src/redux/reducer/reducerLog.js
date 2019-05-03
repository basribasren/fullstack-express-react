import {
	CREATE_LOG_AKTIVITAS,
	GET_LOG_AKTIVITAS,
	GET_LOG_PESANAN
} from 'redux/constants'

const initialState = {
	item_activitas:{},
	list_activitas:[],
	log_pesanan:[]
}

export default function(state = initialState, action) {
	switch (action.type) {
	
	case CREATE_LOG_AKTIVITAS:
		return {
			...state,
			item_activitas: action.payload
		}
	case GET_LOG_AKTIVITAS:
		return {
			...state,
			list_activitas: action.payload
		}
	case GET_LOG_PESANAN:
		return {
			...state,
			log_pesanan: action.payload
		}
	default:
		return state
	}
}
