export default {
	colors: ["#006699", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		
	chart: {
		backgroundColor: 'transparent',
		className: 'dark-container',
		style: {
      fontFamily: 'Ubuntu'
    },
	},

	xAxis: {
		labels: {
			style: {
				color: '#777'
			},
		},
		lineColor: '#cdcdcd',
		tickColor: '#cdcdcd',
		tickPosition: 'inside',

		title: {
			style: {
				color: 'red',
				fontWeight: 'bold',
				fontSize: '12px'

			}
		}
	},
	
	yAxis: {
		gridLineWidth: 0,
		labels: {
			enabled: true,
			style: {
				color: '#888'
			}
		},

		minorTickInterval: null,
		title: {
			style: {
				color: 'orange',
				fontWeight: 'bold',
				fontSize: '12px'
			}
		}
	},
	
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		style: {
			color: '#F0F0F0'
		}
	},
	
	toolbar: {
		itemStyle: {
			color: 'orange'
		}
	},
	
	plotOptions: {
		spline: {
			dataLabels: {
				color: null
			},
			marker: {
				lineColor: 'green' // border-color series point
			}
		},
		scatter: {
			marker: {
				lineColor: '#333'
			}
		},
		candlestick: {
			lineColor: 'white'
		}
	},

	labels: {
		style: {
			color: '#CCC'
		}
	},

	lang: {
    rangeSelectorZoom: '' // remove zoom text
  },
};