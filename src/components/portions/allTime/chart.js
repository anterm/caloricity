import Highstock from 'highcharts/highstock'
import theme from './chartTheme'

import moment from "moment"
import "moment/locale/ru";
moment.locale('ru')

var chart, reactAction, previousPoint;

var config = {
  chart: {
    spacingBottom: 5,
    spacingTop: 0,
    spacingLeft: 0,
    spacingRight: 0,
    renderTo: 'allPortionTotalChart',
    type: 'spline',
    height: '80',
  },
  
  legend: {
    enabled: false
  },

  credits: {
    enabled: false
  },

  rangeSelector: {
    enabled: false,
    allButtonsEnabled: true,
    selected: 2,
    buttons: [
      {
        type: 'week',
        count: 1,
        text: '1 неделя'
      }, {
        type: 'week',
        count: 2,
        text: '2 недели'
      }, {
        type: 'all',
        text: 'все время'
      }
    ]
  },

  navigator: {
    enabled: false
  },

  scrollbar: {
    enabled: false
  },

  plotOptions: {
    spline: {
      dataLabels: {
        enabled: false 
      }
    },

    series: {
      //compare: 'percent',
      cursor: "pointer",
      marker : {
          enabled : true,
      },
      point: {
        marker: { fillColor: "red" },
        events: {
          click: function(event) {
            activePoints(this)
          }
        }
      }
    }
  },
  
  xAxis: { 
    crosshair: {
      width: 10,
      color: 'rgba(0,0,0,0.2)',
      cursor: 'pointer'
    },

    labels: {
      formatter: function () {
        return moment(this.value).format("D MMM")
      }
    }
    //opposite: true
  },

  yAxis: {
    opposite: false
  },

  tooltip: {
    formatter: function(obj, obj1) {
      const date = moment(this.x).utc().format('D MMM YYYY')
      const y = parseInt(this.y)
      return `<span><b>${y}</b></span><span>${date}</span>`
    },
    backgroundColor: null,
    borderWidth: 0,
    shadow: false,
    useHTML: true,
    style: {
        padding: 0
    },
            
    //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    valueDecimals: 0
    //crosshairs: true
  }
}


const seriesOrder = {
  caloricity: 0,
  protein: 1,
  fat: 2,
  ch: 3
}


function prepareData(data, serieIndex) {
  const result = [
    { 
      name: 'Ккал',
      data: parseData(data, 'caloricity'),
      color: "currentColor",
      visible: false,
      marker: { symbol: "circle" }
    },
    { 
      name: 'Белки',
      data: parseData(data, 'protein'),
      color: "currentColor",
      marker: { symbol: "circle" },
      visible: false
    },
    { 
      name: 'Жиры',
      data: parseData(data, 'fat'),
      color: "currentColor",
      marker: { symbol: "circle" },
      visible: false
    },
    { 
      name: 'Углеводы',
      data: parseData(data, 'ch'),
      color: "currentColor",
      marker: { symbol: "circle" },
      visible: false
    }
  ]
  result[serieIndex].visible = true
  return result
}


function parseData(data, fieldName) {
  return data.map(d => {
    return [
      new Date(d._id).getTime(),
      d[fieldName]
    ]
  })
}


function activePoints(currentPoint) {
  reactAction(currentPoint.index)
} 


function addPlotLine(date) {
  chart.xAxis[0].removePlotLine()
  if(!date) return selectedPoint(null)

  var date = new Date(date).getTime()
  for(let point of chart.series[0].data) {
    if(!point) continue
    if(point.x == date) {
      chart.xAxis[0].addPlotLine({
        color: '#2485D0',
        width: 1,
        value: point.x
      });

      selectedPoint(point)
      break
    }
  }
}


function selectedPoint(currentPoint) {
  if(previousPoint) {
    for(let series of chart.series) {
      let point = series.data[previousPoint.index]
      if(!point) continue
      point.update({ 
        color: "transparent", 
        fillColor: series.color 
      })
    }
  }

  previousPoint = currentPoint
  if(!currentPoint) return

  for(let series of chart.series) {
    if(series.name !== 'Navigator') {
      let point = series.data[currentPoint.index]
      if(!point) continue
      point.update({ 
        color: "transparent", 
        fillColor: "orange" 
      })
    }
  }
}


function initConfig(isExtended) {
  config.rangeSelector.enabled = isExtended
  config.scrollbar.enabled = isExtended
  config.chart.height = isExtended ? 250 : 80
}


module.exports = {
  isInit: false,
  
  draw({ data, action, date, isExtended, serieIndex }) {
    if(!data) var data = []
    previousPoint = null
    reactAction = action
    initConfig(isExtended)
    config.series = prepareData(data, serieIndex)
    Highstock.setOptions(theme)
    chart = new Highstock.StockChart(config)

    chart.xAxis[0].removePlotLine()

    if(date)
      addPlotLine(date)
    
    this.isInit = true
  },
  
  redraw({ data, date }) {
    if(typeof date === 'string')
      return addPlotLine(date)
 
    chart.series[0].setData(prepareData(data))
  },
  
  selectSerie(index) {
    const { series } = chart
		if(series[index].visible) return
		
		for(let i = 0; i < series.length; ++i) {
			series[i][i === index ? "show" : "hide"]()
		}
  }
}