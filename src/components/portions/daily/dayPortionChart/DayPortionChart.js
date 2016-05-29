import React, {Component, PropTypes} from 'react'
import styles from './dayPortionChart.css'

var Chart;
if(typeof window !== 'undefined') {
	Chart = require('./chart')
}


export default class DayPortionChart extends Component {
	state = {
		serieIndex: 0
	};
	
	componentDidMount() {
		if(!Chart.isInit && this.props.portions.length) {
			Chart.draw({
				data: this.props.portions,
				action: this.props.setPortion,
				portionIndex: this.props.index,
				serieIndex: this.state.serieIndex
			})
		}
	}

	componentWillReceiveProps(nextProp) {
		if(nextProp.portions
		&& nextProp.portions.length
		&& (nextProp.portions !== this.props.portions)) {
			if(!Chart.isInit) {
				Chart.draw({
					data: nextProp.portions,
					action: this.props.setPortion,
					portionIndex: nextProp.index,
					serieIndex: this.state.serieIndex
				})
			} else {
				Chart.redraw(nextProp.portions, null, nextProp.index)
			}
		}
		if(nextProp.index !== this.props.index) {
			Chart.redraw(null, null, nextProp.index)
		}
	}

	componentWillUnmount() {
		Chart.isInit = false
	}

	render() {
		const { isHidden, date, hideChart, portions} = this.props
		const iconcss = styles.header_icon_chevron + (isHidden ? "" : " rotate90deg")
		const controlText = isHidden ? "Показать" : "Скрыть"
		const chartcss = styles.chart + (isHidden ? " hidden" : "")

		return <div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.header_date}>{date}</span>
				
				<a className={styles.header_link} onClick={hideChart} href='#'>
					<span className={iconcss}></span>
					<span className={styles.header_link_text}>{controlText}</span>
				</a>

				<form className={styles.radio_buttons} onClick={(e) => this.selectSerie(e)}>
					<input defaultValue="0" name="button" type='radio' defaultChecked="checked" id="legend_day_caloricity" />
					<label htmlFor="legend_day_caloricity">Ккал</label>
					<input defaultValue="1" name="button" type='radio' id="legend_day_protein" />
					<label htmlFor="legend_day_protein">Белки</label>
					<input defaultValue="2" name="button" type='radio' id="legend_day_fat" />
					<label htmlFor="legend_day_fat">Жиры</label>
					<input defaultValue="3" name="button" type='radio' id="legend_day_ch" />
					<label htmlFor="legend_day_ch">Углеводы</label>
				</form>
					
			</div>
			<div className={chartcss} id="dayPortionChart"></div>
		</div>
	}
	
	selectSerie(e) {
		var value = e.target.value
		if(!value) return
		
		value = parseInt(value)
		Chart.selectSerie(value)		
		this.setState({ serieIndex: value })
	}
}
