import Highcharts from 'highcharts/highstock'
import theme from './chartTheme'

import moment from "moment"
import "moment/locale/ru";
moment.locale('ru')
  
var chart, previousPoint, reactAction;

const config = {
  chart: {
  	spacingBottom: 0,
    spacingTop: 10,
    spacingLeft: 0,
    spacingRight: 0,
    height: 250,
    renderTo: 'dayPortionChart',
    type: 'line'
  },

  credits: {
    enabled: false
  },

  title: {
  	text: "",
  	style: {
      display: 'none'
    }
  },

  exporting: { enabled: false },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        valueDecimals: 1,
        inside: false,
        color: 'currentColor'
      },
      //dashStyle: "Dot",
      lineWidth: 1,
      marker: {
        //fillColor: 'currentColor',
        lineWidth: 2,
        radius: 4,
        lineColor: 'white' // inherit from series
      },
      cursor: "pointer",
      point: {
        marker: { fillColor: "red" },
        events: {
          click: function(event) {
            activePoints(this)
          }
        }
      }
    },
    marker: {
      fillColor: 'red',
      lineWidth: 1,
      lineColor: null // inherit from series
    }
  },
  
  legend: {
    enabled: false
  },
  
  xAxis: { 
    type: 'datetime',
    dateTimeLabelFormats: {
        day: '%H:%M'
    },

    crosshair: {
        width: 1,
        dashStyle: "dot",
        color: '#ababab',
        cursor: 'pointer'
    },
    //tickInterval: 3600 * 1000
  },

  yAxis: {
    opposite: false,
    title: ""
  },

  tooltip: {
    formatter: function(obj, obj1) {
      const date = moment(this.x).utc().format('HH:mm')
      const y = parseInt(this.y)
      return `<span><b>${y}</b></span><span>${date}</span>`
    },
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 0,
    shadow: false,
    useHTML: true,
    style: {
        padding: 0
    },
    
    /*
    formatter: function() {
      return moment(this.x).utc().format('D MMM YYYY, dddd HH:mm')
        + `<br/>${this.series.name}: ${this.y}`
    },
    */
    //pointFormat: '{series.name}: {point.y}',
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


function addPlotLine(portionIndex) {
  chart.xAxis[0].removePlotLine()
  if(!portionIndex) return selectedPoint(null)
  
  var serieIndex = null
  for(let i = 0; i < chart.series.length; ++i) {
    if(chart.series[i].visible) {
      serieIndex = i
      break
    }
  }
  
  for(let point of chart.series[serieIndex].data) {
    if(point.index == parseInt(portionIndex)) {
      chart.xAxis[0].addPlotLine({
        color: '#D0D0D0',
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
    for(var series of chart.series) {
      if(!series.data.length) continue
      series.data[previousPoint.index].update({ 
        color: "transparent", 
        fillColor: series.color 
      })
    }
  }

  previousPoint = currentPoint
  if(!currentPoint) return

  for(var series of chart.series) {
    if(series.name !== 'Navigator') {
      if(!series.data.length) continue
      series.data[currentPoint.index].update({ 
        color: "transparent", 
        fillColor: "red" 
      })
    }
  }
}

function activePoints(currentPoint) {
  reactAction(currentPoint.index)
} 

function prepareData(data, pureData, serieIndex = 0) {
  var protein = []
  var fat = []
  var ch = []
  var caloricity = []

  data.forEach(portion => {
    const date = new Date(portion.date).getTime()
   // const date = Date.UTC.apply(null, portion.date.split(/\D/))
    var total = portion.products.reduce((prev, curr) => {
      prev.caloricity += curr.caloricity
      prev.protein += curr.protein
      prev.fat += curr.fat
      prev.ch += curr.ch
      return prev
    }, {caloricity: 0, protein: 0, fat: 0, ch: 0})

    caloricity.push([date, parseInt(total.caloricity)])
    protein.push([date, parseInt(total.protein)])
    fat.push([date, parseInt(total.fat)])
    ch.push([date, parseInt(total.ch)])
  })

  if(pureData) {
    return [caloricity, protein, fat, ch]
  }

  const result = [
    { 
      name: 'Ккал',
      data: caloricity,
      color: "currentColor",
      marker: { symbol: "circle", fillColor: "currentColor" },
      visible: false
    },
    { 
      name: 'Белки',
      data: protein,
      color: "green",
      dataLabels: { color: "green" },
      marker: { symbol: "circle", fillColor: "green" },
      visible: false
    },
    { 
      name: 'Жиры',
      data: fat,
      color: "#FF7504",
      marker: { symbol: "circle", fillColor: "#FF7504" },
      dataLabels: { color: "#FF7504" },
      visible: false
    },
    { 
      name: 'Углеводы',
      data: ch,
      color: "#C548D6",
      marker: { symbol: "circle", fillColor: "#C548D6" },
      dataLabels: { color: "#C548D6", style: { textShadow: "none" } },
      visible: false
    }
  ]
  
  result[serieIndex].visible = true
  return result
}

module.exports = {
  isInit: false,
  
  draw({data, action, portionIndex, serieIndex}) {
    previousPoint = null
    reactAction = action
    config.series = prepareData(data, false, serieIndex)
    Highcharts.setOptions(theme);
    chart = new Highcharts.Chart(config)

    chart.xAxis[0].removePlotLine()
    
    if(portionIndex) {
      addPlotLine(portionIndex)
    }
    
    this.isInit = true
  },
  
  redraw(data, index, portionIndex) {
    if(data) {
      previousPoint = null
      var data = prepareData(data, true)
      for(var i = 0; i < data.length; ++i) {
        chart.series[i].setData(data[i], true)
      }
      chart.redraw()
    }

    if(typeof portionIndex === 'string') {
      addPlotLine(portionIndex)
    }
  },
  
  selectSerie(index) {
    const { series } = chart
		if(series[index].visible) return
		
		for(let i = 0; i < series.length; ++i) {
			series[i][i === index ? "show" : "hide"]()
		}
  }
}