import config from '../../config/constants.js'
import asyncRequest from '../utils/request'
import {
	ALL_PORTIONS_REQUEST,
	ALL_PORTIONS_SUCCESS,
	ALL_PORTIONS_FAILURE,
	SET_DEFAULT_ALL_PORTION_STATE
} from '../actionTypes'
 

export const fetch = (user_id, Cookie) => dispatch => {
	const params = { 
		url: `${config.site_url}/api/users/${user_id}/stat/all-time-portions` 
	}
	if(Cookie) params.headers = { Cookie }

	return dispatch({
	  types: [ALL_PORTIONS_REQUEST, ALL_PORTIONS_SUCCESS, ALL_PORTIONS_FAILURE],
	  callAPI: () => asyncRequest(params)
	})
}

export function refreshPortion(id, data) {
	return { type: "ALL_PORTIONS_REFRESH_PORTION", data, id }
}

export function addEmptyPortion(data) {
	return { type: "ALL_PORTIONS_ADD_PORTION_IF_NEEDS", data }
}

export function setDefaultState() {
	return { type: SET_DEFAULT_ALL_PORTION_STATE }
}