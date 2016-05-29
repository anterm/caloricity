import React, {Component, PropTypes} from 'react'

var Chart;
if(typeof window !== 'undefined') {
	Chart = require('./chart')
}

export default class AllPortionChart extends Component {
	componentDidMount() {
		this.drawInit(this.props)
	}

	shouldComponentUpdate(nextProp) {
		return nextProp.portions !== this.props.portions
	}

	componentWillReceiveProps(nextProp) {
		if(nextProp.isChartExtended !== this.props.isChartExtended) {
			return Chart.draw({
				data: this.props.portions, 
				action: this.props.setDayIndex, 
				date: this.props.date, 
				isExtended: nextProp.isChartExtended,
				serieIndex: this.props.serieIndex
			})
		}
		
		this.drawInit(nextProp)
		
		if(Chart.isInit 
		&& this.props.portions.length 
		&& nextProp.status === 'fulfilled' 
		&& (nextProp.portions !== this.props.portions)) {
			Chart.redraw({ data: nextProp.portions, date: this.props.date })
		}

		if(Chart.isInit && nextProp.date !== this.props.date) {
			Chart.redraw({ date: nextProp.date || "" })
		}
		
		if(nextProp.serieIndex !== this.props.serieIndex) 
			Chart.selectSerie(nextProp.serieIndex)	
	}
	
	drawInit(props) {
		const { portions, date, status, isChartExtended, serieIndex } = props
		if(portions.length && !Chart.isInit && status === 'fulfilled') {
			Chart.draw({
				data: portions, 
				action: this.props.setDayIndex,
				date,
				isChartExtended,
				serieIndex
			})
		}
	}
	

	componentWillUnmount() {
		Chart.isInit = false
	}

	render() {
		return <div id='allPortionTotalChart'></div>
	}
}
