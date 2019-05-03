import {
	GET_STATUS_CONNECTION,
	GET_METADATA_CONNECTION
} from 'redux/constants'

export const getStatusConnection = status => dispatch => {
	dispatch({
		type: GET_STATUS_CONNECTION,
		payload: status
	})
	return status
}

export const getMetadataConnection = metadata => dispatch => {
	dispatch({
		type: GET_METADATA_CONNECTION,
		quality: metadata.effectiveType,
		downlink: metadata.downlink,
		tipe: metadata.type,
		rtt: metadata.rtt
	})
	return metadata
}