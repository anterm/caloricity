import {
	PRODUCTS_REQUEST,
	PRODUCTS_SUCCESS,
	PRODUCTS_FAILURE,

	ADD_PRODUCT,
	REMOVE_PRODUCT,
	CHANGE_PRODUCT,

	SET_DEFAULT_PRODUCT_STATE
} from '../actionTypes'


const initialState = {
	status: null,
	value: []
}


export default (state = initialState, action) => {
	switch(action.type) {
		case PRODUCTS_REQUEST: {
			return { 
				...state, 
				status: "pending" 
			}
		}
		
		case PRODUCTS_SUCCESS: {
			return { 
				status: 'fulfilled', 
				value: action.response
			}
		}

		case PRODUCTS_FAILURE: {
			return {
				status: 'rejected',
				error: action.error.message,
				value: []
			}
		}

		case ADD_PRODUCT: {
			return {
				...state, 
				value: [...state.value, action.product]
			}
		}

		case REMOVE_PRODUCT: {
			return {
				...state,
				value: state.value.filter(product => product._id != action.id)
			}
		}
			
		case CHANGE_PRODUCT: {
			var index = -1;
			const products = state.value
			for(var i = 0, len = products.length; i < len; ++i) {
				if(products[i]._id === action.product._id) {
					index = i
					break
				}
			}

			if(index === -1)
				return state

			return {
				...state,
				value: [
					...products.slice(0, index),
					action.product,
					...products.slice(index + 1)
				]
			}
		}

		case SET_DEFAULT_PRODUCT_STATE:
			return initialState

		default:
			return state
	}
} 
