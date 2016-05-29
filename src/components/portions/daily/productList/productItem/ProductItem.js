import React from 'react'
import styles from './productItem.css'


export default function ProductItem({ product }) {
	return <tr className={styles.tr}>
		<td className={styles.name}>{product.name}</td>
		<td className={styles.weight}>{product.weight}</td>
		<td className={styles.protein}>{product.protein}</td>
		<td className={styles.fat}>{product.fat}</td>
		<td className={styles.ch}>{product.ch}</td>
		<td className={styles.caloricity}>{product.caloricity}</td>
	</tr>
}
