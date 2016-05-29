export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = "LOGOUT"



export const PRODUCTS_REQUEST = "PRODUCTS_REQUEST"
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS"
export const PRODUCTS_FAILURE = "PRODUCTS_FAILURE"

export const ADD_PRODUCT 		= "ADD_PRODUCT"
export const REMOVE_PRODUCT = "REMOVE_PRODUCT"
export const CHANGE_PRODUCT = "CHANGE_PRODUCT" 

export const SET_DEFAULT_PRODUCT_STATE = "SET_DEFAULT_PRODUCT_STATE"



export const ALL_PORTIONS_REQUEST = 'ALL_PORTIONS_REQUEST'
export const ALL_PORTIONS_SUCCESS = 'ALL_PORTIONS_SUCCESS'
export const ALL_PORTIONS_FAILURE = 'ALL_PORTIONS_FAILURE'

export const SET_DEFAULT_ALL_PORTION_STATE = "SET_DEFAULT_ALL_PORTION_STATE"



export const DAY_PORTIONS_REQUEST = "DAY_PORTIONS_REQUEST"
export const DAY_PORTIONS_SUCCESS = "DAY_PORTIONS_SUCCESS"
export const DAY_PORTIONS_FAILURE = "DAY_PORTIONS_FAILURE"

export const REMOVE_DAY_PORTION = "REMOVE_DAY_PORTION"
export const CREATE_DAY_PORTION = "CREATE_DAY_PORTION"

export const SET_DEFAULT_DAY_PORTION_STATE = "SET_DEFAULT_DAY_PORTION_STATE"

export const ADD_DAY_PORTION_PRODUCT 		= "ADD_DAY_PORTION_PRODUCT"
export const REMOVE_DAY_PORTION_PRODUCT = "REMOVE_DAY_PORTION_PRODUCT"
export const CHANGE_DAY_PORTION_PRODUCT = "CHANGE_DAY_PORTION_PRODUCT"



export function createDayPortion(portion) {
	return { type: CREATE_DAY_PORTION, portion }
}

export function removeDayPortion(id) {
	return { type: REMOVE_DAY_PORTION, id }
}

export function addDayPortionProduct(portionId, product) {
	return {
		type: ADD_DAY_PORTION_PRODUCT,
		portionId,
		product
	}
}

export function removeDayPortionProduct(portionId, productId) {
	return {
		type: REMOVE_DAY_PORTION_PRODUCT,
		portionId,
		productId
	}
}

export function changeDayPortionProduct(portionId, product) {
	return {
		type: CHANGE_DAY_PORTION_PRODUCT,
		portionId,
		productId: product._id,
		product
	}
}