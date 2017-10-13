var fusionchart = require("fusioncharts");


require("fusioncharts/fusioncharts.charts")(FusionCharts);
require("fusioncharts/fusioncharts.maps")(FusionCharts);
require("fusioncharts/maps/fusioncharts.india")(FusionCharts);
require("fusioncharts/maps/fusioncharts.andamanandnicobar")(FusionCharts);
require("fusioncharts/maps/fusioncharts.andhrapradesh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.arunachalpradesh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.assam")(FusionCharts);
require("fusioncharts/maps/fusioncharts.bihar")(FusionCharts);
require("fusioncharts/maps/fusioncharts.chandigarh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.chattisgarh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.dadraandnagarhaveli")(FusionCharts);
require("fusioncharts/maps/fusioncharts.damananddiu")(FusionCharts);
require("fusioncharts/maps/fusioncharts.delhi")(FusionCharts);
require("fusioncharts/maps/fusioncharts.goa")(FusionCharts);
require("fusioncharts/maps/fusioncharts.gujarat")(FusionCharts);
require("fusioncharts/maps/fusioncharts.haryana")(FusionCharts);
require("fusioncharts/maps/fusioncharts.himachalpradesh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.jammuandkashmir")(FusionCharts);
require("fusioncharts/maps/fusioncharts.jharkhand")(FusionCharts);
require("fusioncharts/maps/fusioncharts.karnataka")(FusionCharts);
require("fusioncharts/maps/fusioncharts.kerala")(FusionCharts);
require("fusioncharts/maps/fusioncharts.lakshadweep")(FusionCharts);
require("fusioncharts/maps/fusioncharts.madhyapradesh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.maharashtra")(FusionCharts);
require("fusioncharts/maps/fusioncharts.manipur")(FusionCharts);
require("fusioncharts/maps/fusioncharts.meghalaya")(FusionCharts);
require("fusioncharts/maps/fusioncharts.mizoram")(FusionCharts);
require("fusioncharts/maps/fusioncharts.nagaland")(FusionCharts);
require("fusioncharts/maps/fusioncharts.odisha")(FusionCharts);
require("fusioncharts/maps/fusioncharts.puducherry")(FusionCharts);
require("fusioncharts/maps/fusioncharts.punjab")(FusionCharts);
require("fusioncharts/maps/fusioncharts.rajasthan")(FusionCharts);
require("fusioncharts/maps/fusioncharts.sikkim")(FusionCharts);
require("fusioncharts/maps/fusioncharts.tamilnadu")(FusionCharts);
require("fusioncharts/maps/fusioncharts.telangana")(FusionCharts);
require("fusioncharts/maps/fusioncharts.tripura")(FusionCharts);
require("fusioncharts/maps/fusioncharts.uttarakhand")(FusionCharts);
require("fusioncharts/maps/fusioncharts.uttarpradesh")(FusionCharts);
require("fusioncharts/maps/fusioncharts.westbengal")(FusionCharts);

var Client = require('node-rest-client').Client;
var client = new Client();
var EDW = {};

EDW.addChart = function(chartRequest) {
	var pathInfo = chartRequest.dataUrl.split("?")[1];
	var queryString = pathInfo.split("&");
	var queryParameters = {};
	var chart;
	for (var i = 0; i < queryString.length; i++) {
		var temp = queryString[i].split("=");
		queryParameters[temp[0]] = temp[1];
	}
	
	var view = queryParameters[".view"];

	client.get(chartRequest.dataUrl, function(data, response) {
		var obj = JSON.parse(data);
		chartRequest.dataset = obj;		
		switch (view) {
		case "vnd.pearson.chart.fusioncharts.msline":
			chart = renderMultiSeriesLineChart(chartRequest);
			break;
		case "vnd.pearson.chart.fusioncharts.pie":
			chart = renderPieChart(chartRequest);
			break;
		case "vnd.pearson.chart.fusioncharts.bar":
			chart = renderBarChart(chartRequest);
			break;
		case "vnd.pearson.chart.fusioncharts.map":
			chart = renderMapChart(chartRequest);
			break;
		default:
			alert("Chart Type Not Found");
		}
		chart.render();
		function drilldown(stateName) {
			getInput (stateName, callback);
		}
		window.drilldown = drilldown;  
	});

}
function getInput (options, callback) {

	callback (options);
	 
}
function renderMultiSeriesLineChart(chartRequest) {
	var chartProperties = {
			"caption" : chartRequest.caption,
			"xAxisName" : chartRequest.xAxisName,
			"yAxisName" : chartRequest.yAxisName,
			"paletteColors": "#0075c2,#1aaf5d",
			"bgcolor": "#ffffff",
			"showBorder": "0",
			"showShadow": "0",
			"showCanvasBorder": "0",
			"usePlotGradientColor": "0",
			"captionFontSize": "14",
			"showAxisLines": "0",
			"showAlternateHGridColor": "0",
			"divlineThickness": "1",
			"divLineIsDashed": "1",
			"divLineDashLen": "1",
			"showValues": "0"
	};
	var lineChart = new FusionCharts({
		type : 'msline',
		renderAt : chartRequest.elementId,
		width : chartRequest.width==null?'300':chartRequest.width,
		height : chartRequest.height==null?'300':chartRequest.height,
		dataFormat : 'json',
		dataSource : {
			chart : chartProperties,
			categories : chartRequest.dataset.categories,
			dataset : chartRequest.dataset.dataset
		},
		"events": {
			"dataPlotClick": function (eventObj, dataObj) {
				getInput(dataObj,callback);
			}
		}
	});
	return lineChart;
}
function renderPieChart(chartRequest) {
	var chartProperties = {
			"caption" : chartRequest.caption,
			"xAxisName" : chartRequest.xAxisName,
			"yAxisName" : chartRequest.yAxisName,
			"showHoverEffect": "1",
			"plottooltext": "$label, $value , $percentValue",
			"bgColor": "#ffffff",
			"showBorder": "0",
			"use3DLighting": "0",
			"showShadow": "0"
	};
	var pieChart = new FusionCharts({
		type : 'pie2d',
		renderAt : chartRequest.elementId,
		width : chartRequest.width==null?'300':chartRequest.width,
		height : chartRequest.height==null?'300':chartRequest.height,
		dataFormat : 'json',
		dataSource : {
			chart : chartProperties,
			categories : chartRequest.dataset.categories,
			data : chartRequest.dataset.data
		}
	});
	return pieChart;
}
function renderBarChart(chartRequest) {
	var chartProperties = {
			"caption" : chartRequest.caption,
			"xAxisName" : chartRequest.xAxisName,
			"yAxisName" : chartRequest.yAxisName,
			"paletteColors": "#0075c2",
			"bgColor": "#ffffff",
			"showBorder": "0",
			"showCanvasBorder": "0",
			"usePlotGradientColor": "0",
			"plotBorderAlpha": "10",
			"placeValuesInside": "1",
			"valueFontColor": "#ffffff",
			"showAxisLines": "1",
			"axisLineAlpha": "25",
			"divLineAlpha": "10",
			"alignCaptionWithCanvas": "0",
			"showAlternateVGridColor": "0",
			"captionFontSize": "14",
			"subcaptionFontSize": "14",
			"subcaptionFontBold": "0",
			"toolTipColor": "#ffffff",
			"toolTipBorderThickness": "0",
			"toolTipBgColor": "#000000",
			"toolTipBgAlpha": "80",
			"toolTipBorderRadius": "2",
			"toolTipPadding": "5"
	};
	var barChart = new FusionCharts({
		type : 'bar2d',
		renderAt : chartRequest.elementId,
		width : chartRequest.width==null?'300':chartRequest.width,
		height : chartRequest.height==null?'300':chartRequest.height,
		dataFormat : 'json',
		dataSource : {
			chart : chartProperties,
			categories : chartRequest.dataset.categories,
			data :  chartRequest.dataset.dataset[0].data
		}
	});
	return barChart;
}
function renderMapChart(chartRequest) {
	var type = chartRequest.dataset.type.toLowerCase().replace(" ", "");
	var chartProperties = {
			"caption" : chartRequest.caption,
			"xAxisName" : chartRequest.xAxisName,
			"yAxisName" : chartRequest.yAxisName,
			"showLabels": "0",
			"useSNameInLabels" : "0",
            "theme": "fint",
			"showCanvasBorder" : 0,
			"includeValueInLabels":"1",
			"labelSepChar" : "<br>",
			"nullEntityColor" : "#ffffff",
			"showLegend" :"1",
			"showEntityToolTip":"0",
			"useHoverColor":"0",
			"hoverColor":"#FCFFFF",
			"fillColor":"#022F84"
	};
	var mapChart = new FusionCharts({
		type : 'maps/'+type,
		renderAt : chartRequest.elementId,
		width : chartRequest.width==null?'300':chartRequest.width,
		height : chartRequest.height==null?'300':chartRequest.height,
		dataFormat : 'json',
		dataSource : {
			chart : chartProperties,	
			 "colorrange": {
				"color": [
					{
						"minvalue": "0",
						"maxvalue": "50",
						"code": "#CADEFF",
						"displayValue": "< 50"
					},
					{
						"minvalue": "50",
						"maxvalue": "100",
						"code": "#98C1FF",
						"displayValue": "50-100"
					},
					{
						"minvalue": "100",
						"maxvalue": "200",
						"code": "#4892FD",
						"displayValue": "100-200"
					},
					{
						"minvalue": "200",
						"maxvalue": "500",
						"code": "#0A70FF",
						"displayValue": "200-500"
					},
					{
						"minvalue": "500",
						"maxvalue": "1000",
						"code": "#4992FF",
						"displayValue": "500-1000"
					},
					{
						"minvalue": "1000",
						"maxvalue": "2000",
						"code": "#0043B6",
						"displayValue": "> 2000"
					}
				]
			},
			data :chartRequest.dataset.data
		}
	});
	return mapChart;
}

module.exports = EDW;