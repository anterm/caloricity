import React, { Component } from 'react';
import ProductList from '../productList/ProductList'
import styles from './portionItem.css'

export default class PortionItem extends Component {
	state = {
		isPortionVisible: true
	};

	render() {
		const { portion, popup } = this.props
		const portionTime = portion.date.substr(11, 5)
		
		var iconcss = styles.icon_chevron
		var titlecss = styles.title
		var contentcss = styles.content
		
		if(this.state.isPortionVisible) {
			titlecss += " " + styles.grayBG
			iconcss  += " rotate90deg"
			contentcss += " show"
		}

		return <div>
			<div className={titlecss} onClick={(e) => this.rotate90deg(e)}>
				<div className={styles.container}>
					<span className={iconcss}></span>
					<span className={styles.title_time}>{portionTime}</span>
					<span className={styles.title_value}>({portion.products.length})</span>
				</div>
			</div>

			<div className={contentcss}>
				<div className={styles.container}>
					<ProductList popup={popup} portion={portion} />
					<div className={styles.controls}>
						<a className={styles.link} href="javascript:void(0)" onClick={() => popup('new_product', portion._id)}>
							<span className={styles.icon_plus}></span>
							Добавить продукт
						</a>
						<a className={styles.link} href="javascript:void(0)" onClick={() => popup('remove_portion', portion)}>
							<span className={styles.icon_delete}></span>
							Удалить порцию
						</a>
					</div>
				</div>
			</div>
		</div>
	}

	rotate90deg(e) {
		e.preventDefault()
		this.setState({ isPortionVisible: !this.state.isPortionVisible });
	}
}