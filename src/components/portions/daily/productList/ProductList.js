import React, {Component, PropTypes} from 'react'
import ProductItem from './productItem/ProductItem'

import styles from './productList.css'

export default class ProductList extends Component {
	render() {
		const { portion, isHidden } = this.props
		if(!portion) 
			return null

		const products = portion.products.map(product => {
			return <ProductItem key={product._id} product={product} />
		})

		const csscontainer = styles.container + (isHidden ? " hidden" : "")
		var header;
		if(portion) {
			header = <div className={styles.header}>
				<span className={styles.header_date}>{portion.date.substr(11, 5)}</span>
				<span className={styles.header_product_count}>продукты ({portion.products.length})</span>
			</div>
		}
		return <div className={csscontainer}>
			{header}
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						<td className={styles.thead_product}>Продукт</td>
						<td className={styles.weight}>Вес</td>
						<td className={styles.thead_protein}>Белок</td>
						<td className={styles.thead_fat}>Жир</td>
						<td className={styles.thead_ch}>Угл.</td>
						<td className={styles.thead_caloricity}>Ккал</td>
					</tr>
				</thead>
				<tbody>{products}</tbody>
			</table>
		</div>
	}
}