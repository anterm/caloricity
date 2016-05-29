import React, {Component, PropTypes} from 'react'
import ProductItem from './productItem/ProductItem'
import styles from './productList.css'

export default class ProductList extends Component {
	render() {
		const { products, popup } = this.props
		const productHtml = products.length
			? <table className={styles.table}>
					<thead>
						<tr>
							<th>Название</th>
							<th>Белки</th>
							<th>Жиры</th>
							<th>Углеводы</th>
							<th>Кал (100 гр)</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					{products.map((product, i) => {
						return <ProductItem key={i} product={product} popup={popup} />
					})}
					</tbody>
				</table>
			: null

		return <div>{productHtml}</div>
	}
}
