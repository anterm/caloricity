const initialState = {
	status: null,
	value: []
} 

export default (state = initialState, action) => {
	switch(action.type) {
		case 'ALL_PORTIONS_REQUEST':
			return { 
				...state,
				status: 'pending' }

		case 'ALL_PORTIONS_SUCCESS': {
			return {
				status: 'fulfilled',
				value: prepare(action.response)
			}
		}

		case 'ALL_PORTIONS_FAILURE': {
			return { 
				...state,
				status: "rejected", 
				error: action.error.message 
			}
		}
		
		// add new empty portion to allPortions if needs
		case 'ALL_PORTIONS_ADD_PORTION_IF_NEEDS': {
			const portions = state.value
		
			for(var i = 0; i < portions.length; ++i) {
				// stop if the portion exists
				if(action.data._id === portions[i]._id)
					return state
					
				if(action.data._id < portions[i]._id)
					break
			}
			
			console.log(action.data)
				
			return {
				...state,
				value: [
					...portions.slice(0, i),
					action.data,
					...portions.slice(i)
				]
			}
		}
		
		case 'ALL_PORTIONS_REFRESH_PORTION': {
			const portions = state.value.slice()
			
			for(let i = 0, len = portions.length; i < len; ++i) {
				const portion = portions[i]
				if(portion._id !== action.id) continue
				
				const newPortion  = { ...portion }
				newPortion.caloricity += action.data.caloricity || 0
				newPortion.protein += action.data.protein || 0
				newPortion.fat += action.data.fat || 0
				newPortion.ch += action.data.ch || 0
				
				portions[i] = newPortion
			}
			
			return {
				...state,
				value: portions
			}
		}
		
		case 'SET_DEFAULT_ALL_PORTION_STATE':
			return initialState

		default:
			return state
	}
}

function prepare(portions) {
	for(let i = 0, len = portions.length; i < len; ++i) {
		const portion = portions[i]
		portion.caloricity = parseInt(portion.caloricity)
		portion.protein = parseInt(portion.protein)
		portion.fat = parseInt(portion.fat)
		portion.ch = parseInt(portion.ch)
	}
	return portions
}