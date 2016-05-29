import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProductActions from '../../actions/products'

import ProductList from './productList/ProductList'
import Popups from './popups/Popups'

import styles from './products.css'

class ProductContainer extends Component {
	static fetchData(dispatch, params, cookie, user_id) {
    return dispatch(ProductActions.fetch(user_id, cookie))
  };

	state = {
		popup: {
			name: 'hide',
			data: null
		}
	};

  componentDidMount() {
  	const { actions, userId, products } = this.props

  	if(products.status == null) {
  		actions.fetch(userId)
  	}
  }

	render() {
		const { actions, userId } = this.props

		return <div className={styles.block}>
			<Popups 
				userId={userId}
				popup={this.state.popup} 
				popupAction={this.popup} 
				actions={actions} />

			<div className={styles.container}>
				<div className={styles.row}>
					{this.renderProducts()}
				</div>
			</div>
		</div>
	}


	renderProducts() {
		const { products, actions } = this.props

		switch(products.status) {
			case 'pending':
				return <div><b>Загрузка продуктов...</b></div>

			case 'fulfilled':
				return <div className={styles.left_block}>
					<div className={styles.title}>Список продуктов ({products.value.length})</div>
					<ProductList 
						products={products.value}
						popup={this.popup} />
					<a 
						href="javascript:void(0)" 
						className={styles.link_new_product}
						onClick={() => this.popup('new_product')}>Добавить продукт</a>
				</div>

			case 'rejected':
				return <div className='rejected'>{products.error}</div>

			default:
				return null
		}
	}

	popup = (name, data) => {
		this.setState({ 
			popup: {
				name,
				data
			}
		})
	};
}


export default connect(
	state 	 => ({ products: state.products, userId: state.auth.userId }),
	dispatch => ({ actions: bindActionCreators(ProductActions, dispatch) })
)(ProductContainer)


