import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT
} from '../actionTypes'

const initialState = {
	status: null,
	isLogged: false
}

export default (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_REQUEST: {
			return {
				status: "pending",
				isLogged: false
			}
		}

		case LOGIN_SUCCESS: {
			return {
				status: 'fulfilled',
				isLogged: true,
				username: action.response.username,
				userId: action.response.id
			}
		}

		case LOGIN_FAILURE: {
			return {
				status: 'rejected',
				isLogged: false,
				errors: action.error.response.body
			}
		}
		
		case 'CLIENT_LOGIN_FAILURE': {
			return {
				status: 'rejected',
				isLogged: false,
				errors: action.errors
			}
		}

		case LOGOUT:
			return initialState
	}

	return state
}