import React, { Component } from 'react';

import Loading from '../../helpers/loading/Loading'
import AllPortionChart from './AllPortionChart'

import styles from './allPortions.css'

export default class AllPortions extends Component {
	state = {
		extendedChart: false,
		serieIndex: 0
	};

	render() {
		const { portions, setDayIndex, date, goToEditPortion, goToNewPortion } = this.props
		const iconcss = styles.icon_chevron + (this.state.extendedChart ? " rotate90deg" : "")
		return <div className={styles.block}>
			<div className={styles.container}>
				<Loading data={portions} spinnerText="Загрузка графика">
					<div className={styles.title}>
						<a className={styles.link} onClick={this.extendChart} href='#'>
							<span className={iconcss}></span>
							<span className={styles.link_text}>Подробнее</span>
						</a>
						
						<form className={styles.radio_buttons} onClick={this.setSerieIndex}>
							<input defaultValue="0" name="button" type='radio' id="legend_caloricity" defaultChecked="checked" />
							<label htmlFor="legend_caloricity">Ккал</label>
							<input defaultValue="1" name="button" type='radio' id="legend_protein" />
							<label htmlFor="legend_protein">Белки</label>
							<input defaultValue="2" name="button" type='radio' id="legend_fat" />
							<label htmlFor="legend_fat">Жиры</label>
							<input defaultValue="3" name="button" type='radio' id="legend_ch" />
							<label htmlFor="legend_ch">Углеводы</label>
						</form>

						<button className={styles.button} onClick={goToNewPortion}>
							<span className={styles.icon_plus}></span>
						</button>
						
						{date 
							? <button className={styles.button} onClick={goToEditPortion}>
									<span className={styles.icon_pencil}></span> 
									<span className={styles.text}>{date}</span>
								</button>
							: null
						}
					</div>
					<AllPortionChart 
						status={portions.status}
						isChartExtended={this.state.extendedChart}
						date={date}
						portions={portions.value} 
						serieIndex={this.state.serieIndex}
						setDayIndex={setDayIndex} />
				</Loading>
			</div>
		</div>
	}
	
	setSerieIndex = (e) => {
		const value = e.target.value
		if(!value) return
		const index = parseInt(value)
		this.setState({ serieIndex: index })
	};
	
	extendChart = (e) => {
		e.preventDefault()
		this.setState({extendedChart: !this.state.extendedChart});
	};
}
