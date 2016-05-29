import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AllPortionActions from '../../actions/allPortions'
import * as DayPortionActions from '../../actions/dayPortions'
import * as PortionProductActions from '../../actions/portionProducts'
import * as ProductActions from '../../actions/products'

import { 
	AllPortions,
	DayPortions,
	CreatingPortion
} from './'

import styles from './portion.css'


class PortionContainer extends Component {
	static fetchData(dispatch, params, cookie, userId) {
		return dispatch(AllPortionActions.fetch(userId, cookie)).then(result => {
			if(params.date) {
				return dispatch(DayPortionActions.fetch(params.date, userId, cookie))
			}
		})
  }

  state = {
  	selectedPortion: null
  };
	
  render() {
		const { allPortions, dayPortions, actions, userId, products, params } = this.props
		
		return <div className={styles.fullWidthBlock}>
			{params.mode === 'edit'
				? <CreatingPortion
						userId={userId} 
						date={params.date}
						portions={dayPortions}
						router={this.context.router} 
						products={products}
						actions={actions} />
						
				:	<div>
						<AllPortions
							date={params.date}
							portions={allPortions} 
							setDayIndex={this.setDayIndex}
							goToEditPortion={this.goToEditPortion}
							goToNewPortion={this.goToNewPortion} />

						<DayPortions
							index={params.index || ""}
							portions={dayPortions}
							selectedPortion={this.state.selectedPortion}
							setPortion={this.setPortion} />
					</div>
			}
		</div>
	}

  componentDidMount() {
  	const { allPortions, dayPortions, params, actions, userId } = this.props

  	// если allPortions не загружено - загружаем
  	if(allPortions.status !== 'fulfilled') {
  		actions.allPortions.fetch(userId).then(result => {
				const portions = result.response
				if(portions && portions.length === 0)
					this.goToNewPortion()
			})
  	}
		
		if(allPortions.status === 'fulfilled' && allPortions.value.length === 0) {
			this.goToNewPortion()	
		}
		
  	if(params.date) {
  		// кеш для переходов типа: 
  		// /someurl/2015-08-08 => /otherurl/blabla => /someurl/2015-08-08
  		if(dayPortions.status === 'fulfilled' && (dayPortions.date === params.date)) {
  			if(!params.index) return

				const selectedPortion = dayPortions.value[parseInt(params.index)]
				this.setState({ selectedPortion })
  			return
  		}

  		actions.dayPortions.fetch(params.date, userId).then(portions => {
				if(!params.index) return

				const selectedPortion = portions.response[parseInt(params.index)]
				this.setState({ selectedPortion })
			})
  	} else {
  		// очищаем старые данные
  		actions.dayPortions.setDefaultState()
  	}
  }

  componentWillReceiveProps(nextProp) {
  	const nextDate = nextProp.params.date
  	const index = nextProp.params.index
  	const { userId, params, actions, dayPortions } = this.props

		if(params.date !== nextDate) {
			if(nextDate) {
				actions.dayPortions.fetch(nextDate, userId).then(result => {
					if(!index) return
					this.setState({ selectedPortion: result.response[parseInt(index)]})
				})
			}
			else {
				actions.dayPortions.setDefaultState()
				this.setState({selectedPortion: null});
			}
		}

		if(params.index !== index) {
			const selectedPortion = index 
				? dayPortions.value[parseInt(index)]
				: null

			this.setState({ selectedPortion })
		}
	}

	setPortion = (index) => {
		if(typeof index !== 'number') return
		this.context.router.push("/portions/view/" + this.props.params.date + "/" + index)	
	};

	setDayIndex = (index) => {
		if(typeof index !== 'number') return
		this.context.router.push("/portions/view/" + this.props.allPortions.value[index]._id)
	};

	goToNewPortion = () => {
		this.props.actions.dayPortions.setDefaultState()
		const date = new Date().toISOString().substr(0, 10)
		this.context.router.push("/portions/edit/" + date)
	};

	goToEditPortion = () => {
		const path = this.props.location.pathname.replace("view", "edit")
		this.context.router.push(path)
	};
}

PortionContainer.contextTypes = {
	router: React.PropTypes.object.isRequired
}


export default connect(
	state => ({ 
		allPortions: state.portions.all,
		dayPortions: state.portions.day,
		products: state.products,
		userId: state.auth.userId
	}),
	dispatch => ({ 
		actions: {
			allPortions: bindActionCreators(AllPortionActions, dispatch),
			dayPortions: bindActionCreators(DayPortionActions, dispatch),
			portionProducts: bindActionCreators(PortionProductActions, dispatch),
			products: bindActionCreators(ProductActions, dispatch)
		}
	})
)(PortionContainer)