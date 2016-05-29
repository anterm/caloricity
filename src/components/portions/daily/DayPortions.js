import React, { Component } from 'react'

import Loading from '../../helpers/loading/Loading'
import DayPortionChart from './dayPortionChart/DayPortionChart'
import ProductList from './productList/ProductList'

import styles from './dayPortions.css'

export default class DayPortions extends Component {
	state = {
		isHidden: false
	};

	render() {
		const { portions, selectedPortion, setPortion, index } = this.props
		const { isHidden } = this.state
		const controlText = isHidden ? "Показать" : "Скрыть"
		const bodycss = styles.content + (isHidden ? " hidden" : "")
		const iconcss = styles.header_icon_chevron + (isHidden ? "" : " rotate90deg")
		
		const spinnerText = "Загрузка дневных порций " + portions.date

		return <div className={styles.block}>
			<Loading spinnerText={spinnerText} data={portions}>
				<div className={styles.container}>
					<div className={styles.row}>
						<DayPortionChart 
							index={index}
							portions={portions.value} 
							date={portions.date}
							setPortion={setPortion}
							isHidden={isHidden} 
							hideChart={this.toggle} />

						<ProductList 
							portion={selectedPortion}
							isHidden={isHidden} />
					</div>
				</div>
			</Loading>
		</div>
	}

	toggle = (e) => {
		e.preventDefault()
		this.setState({isHidden: !this.state.isHidden})
	};
}