import {
	addDayPortionProduct,
	changeDayPortionProduct,
	removeDayPortionProduct
} from '../actionTypes'

import asyncRequest from '../utils/request'


export const add = (portionId, product) => dispatch => {
	const params = {
		url: `/api/portions/${portionId}/products`,
		method: "post",
		data: product
	}

	return asyncRequest(params).then(product => {
		dispatch(addDayPortionProduct(portionId, product))
		return product
	})
}

export const remove = (portionId, productId) => dispatch => {
	const params = {
		url: `/api/portions/${portionId}/products/${productId}`,
		method: "del"
	}

	return asyncRequest(params).then(product => {
		dispatch(removeDayPortionProduct(portionId, productId))
	})
}

export const change = (portionId, product, productDiff) => dispatch => {
	const params = {
		url: `/api/portions/${portionId}/products/${product._id}`,
		method: "put",
		data: productDiff
	}

	return asyncRequest(params).then(() => {
		dispatch(changeDayPortionProduct(portionId, product))
	})
}