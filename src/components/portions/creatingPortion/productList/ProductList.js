import React, { Component } from 'react';
import styles from './productList.css'


export default class ProductList extends Component {
	render() {
		const { portion, popup } = this.props
		return <div className={styles.main}>
			<table className={styles.table}>
			<thead>
				<tr>
					<th>Продукт</th>
					<th>Вес</th>
					<th>Белки</th>
					<th>Жиры</th>
					<th>Углеводы</th>
					<th>Ккал</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{portion.products.map(product => {
				return <tr key={product._id}>
					<td className={styles.name}>{product.name}</td>
					<td>{product.weight}</td>
					<td>{product.protein}</td>
					<td>{product.fat}</td>
					<td>{product.ch}</td>
					<td>{product.caloricity}</td>
					<td>
						<span 
							className={styles.link_pencil} 
							onClick={() => popup('edit_product', { portionId: portion._id, product })}>
						</span>
						<span 
							className={styles.link_delete} 
							onClick={() => popup('remove_product', { portionId: portion._id, product})}>
						</span>
					</td>
				</tr>
				})}
			</tbody>
		</table>
		</div>
	}
}
