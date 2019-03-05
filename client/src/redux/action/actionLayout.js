import {
    GET_STATUS_CONNECTION,
    GET_METADATA_CONNECTION,
    CLOSE_STATUS_CONNECTION
} from "../constants";

export const getStatusConnection = status => dispatch =>{
    dispatch({
        type: GET_STATUS_CONNECTION,
        payload: status
    });
    return status;
};

export const getMetadataConnection = metadata => dispatch => {
    dispatch({
        type: GET_METADATA_CONNECTION,
        quality: metadata.effectiveType,
        downlink: metadata.downlink,
        tipe: metadata.type,
        rtt: metadata.rtt
    });
    return metadata;
};

export const closeStatusConnection = data => dispatch => {
    dispatch({
        type: CLOSE_STATUS_CONNECTION
    });
    return data;
};
