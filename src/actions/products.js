import config from '../../config/constants'
import asyncRequest from '../utils/request'
import {
	PRODUCTS_REQUEST, 
	PRODUCTS_SUCCESS, 
	PRODUCTS_FAILURE,
	
	ADD_PRODUCT,
	CHANGE_PRODUCT,
	REMOVE_PRODUCT,
	
	SET_DEFAULT_PRODUCT_STATE
} from '../actionTypes'

export const fetch = (user_id, Cookie) => dispatch => {
	const params = { 
		url: `${config.site_url}/api/users/${user_id}/products`
	}
	if(Cookie) params.headers = { Cookie }

	return dispatch({
	  types: [PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE],
	  //shouldCallAPI: (state) => !state.products.status,
	  callAPI: () => asyncRequest(params)
	})
}


export const create = (userId, product) => dispatch => {
	const params = {
		url: `/api/users/${userId}/products`,
		method: "post",
		data: product
	}

	return asyncRequest(params).then(product => {
		dispatch({ type: ADD_PRODUCT, product })
		return product
	})
}


export const change = (userId, product, productDiff) => dispatch => {
	const params = { 
		url: `/api/users/${userId}/products/${product._id}`,
		method: "put", 
		data: productDiff 
	}

	return asyncRequest(params).then(() => {
		dispatch({ type: CHANGE_PRODUCT, product })
	})
}


export const remove = (userId, id) => dispatch => {
	const params = { 
		url: `/api/users/${userId}/products/${id}`,
		method: "del"
	}

	return asyncRequest(params).then(() => {
		dispatch({ type: REMOVE_PRODUCT, id })
	})
}


export function setDefaultState() {
	return { type: SET_DEFAULT_PRODUCT_STATE	}
}