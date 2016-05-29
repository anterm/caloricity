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
	
	title: {
		style: {
			color: '#C0C0C0',
			font: 'bold 16px'
		}
	},
	
	subtitle: {
		style: {
			color: '#666666',
			font: 'bold 12px'
		}
	},
	
	xAxis: {
		labels: {
			style: {
				color: '#065490'
			},
		},
		lineColor: '#2485D0',
		tickColor: '#2485D0',
		tickPosition: 'inside',

		title: {
			style: {
				color: '#CCC',
				fontWeight: 'bold',
				fontSize: '12px'
			}
		}
	},
	
	yAxis: {
		gridLineColor: 'rgba(0,0,0,0)',
		labels: {
			enabled: true,
			style: {
				color: '#065490'
			}
		},
		minorTickInterval: null,
		title: {
			style: {
				color: '#CCC',
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
		 series: {
        marker: {
          lineWidth: 1,
          lineColor: 'rgb(79, 157, 217)', // inherit from series
          fillColor: 'rgb(12, 88, 147)',
          radius: 3
        },
        dashStyle: "Solid",
				lineWidth: 2
    },
		line: {
			dataLabels: {
				color: '#CCC'
			},
			marker: {
				lineColor: '#333'
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
	
	legend: {
		itemStyle: {
			font: '9pt',
			color: '#A0A0A0'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#444'
		}
	},
	
	credits: {
		style: {
			color: '#666'
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

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: "#4891CA",
			stroke: '#327EBA',
			'stroke-width': 1,
			r: 4,
			width: 100,
			style: {
				color: '#E9F2FA',
				//fontWeight: 'bold'
			},
			states: {
				hover: {
					fill: "#E9F2FA",
					stroke: '#1E6FAD',
					style: {
						color: '#2485D0'
					}
				},
				select: {
					fill: "#2485D0",
					stroke: '#327EBA',
					style: {
						fontWeight: "normal",
						color: '#CFEAFF'
					}
				}
			}
		},
		
		inputBoxBorderColor: "#70B8EF",
		inputEnabled: false,
		inputStyle: {
			backgroundColor: '#0D5994',
			color: '#efefef'
		},
		
		labelStyle: {
			color: '#666'
		}
	},

	navigator: {
		handles: {
			backgroundColor: 'blue',
			borderColor: 'orange'
		},
		outlineColor: 'green',
		maskFill: 'rgba(255,255,255,0.2)',
		series: {
			color: 'green',
			lineColor: 'blue'
		}
	},

	scrollbar: {
		barBackgroundColor: "#316E9D",
		barBorderColor: '#226091',
		
		buttonArrowColor: '#D09C3D',
		buttonBackgroundColor: "#3275A9",
		buttonBorderColor: 'transparent',
		
		rifleColor: 'orange',
		trackBackgroundColor: "#3E8BC7",
		trackBorderColor: 'trasparent'
	},

	// special colors for some of the
	legendBackgroundColor: '#006699',
	background2: '#006699',
	dataLabelsColor: '#006699',
	textColor: '#006699',
	maskColor: '#006699'
};