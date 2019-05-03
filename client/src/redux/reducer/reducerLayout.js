import {
	GET_STATUS_CONNECTION,
	GET_METADATA_CONNECTION
} from 'redux/constants'

const initialState = {
	online: true,
	type: 'none',
	quality: '3g',
	downlink: 0,
	rtt: 0
}

export default function(state = initialState, action) {
	switch (action.type) {
	case GET_STATUS_CONNECTION:
		return {
			...state,
			online: action.payload
		}
	case GET_METADATA_CONNECTION:
		return {
			...state,
			type: action.tipe,
			quality: action.quality,
			downlink: action.downlink,
			rtt: action.rtt
		}
	default:
		return state
	}
}
