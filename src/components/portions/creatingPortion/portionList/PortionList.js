import React, { Component } from 'react';
import PortionItem from '../portionItem/PortionItem'

import styles from './portionList.css'

export default class PortionList extends Component {
	render() {
		const { 
			portions, 
			date, 
			popup
		} = this.props

		const p = portions.value.length
			? portions.value.map(portion => {
					return <PortionItem 
						popup={popup}
						key={portion._id} 
						portion={portion} />
				})
			: <div className={styles.container}>
					За {date} дату нет записей. Создайте
					<a 
						className={styles.link_new_portion}
						href="javascript:void(0)" 
						onClick={() => popup('new_portion', date)}>
						новую порцию
					</a>
				</div>

		return <div className={styles.block}>
			{p}
		</div>
	}
}
