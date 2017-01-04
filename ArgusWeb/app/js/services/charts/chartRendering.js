angular.module('argus.services.charts.rendering', [])
.service('ChartRenderingService', [function() {
		'use strict';

		var service = {
				getChart: function(chartId, highChartOptions) {
						if (!chartId) return;
						$('#' + chartId).highcharts('StockChart', highChartOptions);
						var chart = $('#' + chartId).highcharts('StockChart');
						return chart;
				},

				setChartContainer: function(element, chartId, cssOpts) {
						if (!element || !chartId) return;
						element.prepend('<div id='+ chartId +' class="chartContainer ' + cssOpts +'"></div>');
				},

				loadChart: function(chartId, highChartOptions) {
						var chart = this.getChart(chartId, highChartOptions);

						// show loading spinner & hide 'no data message' during api request
						if (chart)
								this.loading(chart, true);
				},

				loading: function(chart, loading) {
						if (!chart) return;

						// show loading indicator if chart is loading
						if (loading) {
								chart.showLoading();
								chart.hideNoData();
						} else {
								// chart finishd loading: hide loading indicator when loading is complete; chart may have no data.
								chart.hideLoading();
								if ( !chart.hasData() )
										chart.showNoData();
						}
				},

				displayChart: function(chartId, highChartOptions) {
						// display chart in DOM
						var chart = this.getChart(chartId);

						// hide the loading spinner after data loads.
						if (chart)
								this.loading(chart, false);
				},

				updateIndicatorStatus: function(attributes, lastStatusVal) {
						if (!attributes || !lastStatusVal) return;

						if (lastStatusVal < attributes.lo) {
								$('#' + attributes.name + '-status').removeClass('red orange green').addClass('red');
						} else if (lastStatusVal > attributes.lo && lastStatusVal < attributes.hi) {
								$('#' + attributes.name + '-status').removeClass('red orange green').addClass('orange');
						} else if (lastStatusVal > attributes.hi) {
								$('#' + attributes.name + '-status').removeClass('red orange green').addClass('green');
						}
				}
		};

		return service;
}]);