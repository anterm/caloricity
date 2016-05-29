import * as types from '../../actionTypes'

const initialState = {
	status: null,
	value: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case types.DAY_PORTIONS_REQUEST: 
			return { 
				...state,
				date: action.payload,
				status: "pending"
			}

		case types.DAY_PORTIONS_SUCCESS: {
			const portions = action.response

			return {
				date: action.payload,
				status: "fulfilled",
				value: portions,
				total: getTotal(portions)
			}
		}

		case types.DAY_PORTIONS_FAILURE:
			return {
				...state,
				status: 'rejected',
				error: action.error.message
			}

		case types.CREATE_DAY_PORTION:
			var portions = state.value
	
			for(var i = 0; i < portions.length; ++i) {
				if(action.portion.date < portions[i].date)
					break
			}

			return {
				...state,
				value: [
					...portions.slice(0, i),
					action.portion,
					...portions.slice(i)
				]
			}

		case types.REMOVE_DAY_PORTION:
			return {
				...state,
				value: state.value.filter(portion => portion._id !== action.id)
			}


		case types.ADD_DAY_PORTION_PRODUCT: {
			var index = -1;
			for(var i = 0, len = state.value.length; i < len; ++i) {
				if(state.value[i]._id === action.portionId) {
					index = i
					break
				}
			}

			if(index === -1) {
				return state
			}
			
			const new_state = state.value.slice()
			new_state[index].products.push(action.product)

			return {
				...state,
				total: getTotal(new_state),
				value: new_state
			}
		}

		case types.REMOVE_DAY_PORTION_PRODUCT: {
			var portions = state.value.slice()
			var removedProduct;

			for(var i = 0, len = portions.length; i < len; ++i) {
				if(portions[i]._id === action.portionId) {
					portions[i].products = portions[i].products.filter(
						product => product._id !== action.productId
					)
					break
				}
			}

			return {
				...state,
				total: getTotal(portions),
				value: portions
			}
		}

		case types.CHANGE_DAY_PORTION_PRODUCT: {
			var portions = state.value.slice()

			for(var i = 0, len = portions.length; i < len; ++i) {
				var portion = portions[i]
				
				if(portion._id !== action.portionId) 
					continue

				for(var k = 0; k < portion.products.length; ++k) {
					if(portion.products[k]._id === action.productId) {
						portion.products[k] = action.product
						break
					}
				}
				break
			}

			return {
				...state,
				total: getTotal(portions),
				value: portions
			}
		}

		case types.SET_DEFAULT_DAY_PORTION_STATE:
			return initialState

		default:
			return state
	}
}


function getTotal(portions) {
	var total = {caloricity: 0, protein: 0, fat: 0, ch: 0}

	for(var i = 0, len = portions.length; i < len; ++i) {
		var products = portions[i].products
		for(var k = 0; k < products.length; ++k) {
			const product = products[k]
			total.caloricity += parseInt(product.caloricity)
			total.protein += parseInt(product.protein)
			total.fat += parseInt(product.fat)
			total.ch += parseInt(product.ch)
		}
	}

	return total
}