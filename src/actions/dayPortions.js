import config from '../../config/constants'
import asyncRequest from '../utils/request'
import {
	createDayPortion,	
	removeDayPortion,

	DAY_PORTIONS_REQUEST, 
	DAY_PORTIONS_SUCCESS, 
	DAY_PORTIONS_FAILURE,

	SET_DEFAULT_DAY_PORTION_STATE
} from '../actionTypes'



export const create = portion => dispatch => {
	const params = {
		url: "/api/portions",
		method: "post",
		data: portion
	}

	return asyncRequest(params).then(portion => {
		dispatch(createDayPortion(portion))
		return portion
	})
}


export const remove = id => dispatch => {
	const params = {
		url: "/api/portions/" + id,
		method: "del"
	}

	return asyncRequest(params).then(() => {
		dispatch(removeDayPortion(id))
	})
}


export const fetch = (date, user_id, Cookie) => dispatch => {
	const params = { 
		url: `${config.site_url}/api/users/${user_id}/portions/date/${date}` 
	}
	if(Cookie) params.headers = { Cookie }

	return dispatch({
	  types: [DAY_PORTIONS_REQUEST, DAY_PORTIONS_SUCCESS, DAY_PORTIONS_FAILURE],
	  callAPI: () => asyncRequest(params),
	  payload: date
	})
}


export function setDefaultState() {
	return { type: SET_DEFAULT_DAY_PORTION_STATE	}
}