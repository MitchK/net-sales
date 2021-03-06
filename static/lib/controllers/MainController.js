app.controller('MainController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

	// Scope data
	$scope.netSales = [];
	$scope.selectedIndex = -1;
	$scope.selectedCountry = null;

	// Non-scope functions

	function showYearlyDistribution(distribution) {
		if (!distribution)
			return;

		var key = 'Data';
		var values = [];

		distribution.forEach(function (item) {
			var sales = parseInt(item.sales.replace('M', ''));
			console.log(sales);
			values.push([ item.quarter, sales ]);
		});

		$scope.chartData = [
			{
				key: key,
				values: values
			}
		];
	};

	// Scope functions
	$scope.valueFormat = function (val) {
		return val + 'M'
	};

	$scope.selectCountryWithIndex = function (index) {
		if ($scope.netSales.length < 0 || index >= $scope.netSales.length) 
			return;

		$scope.selectedIndex = index;
		$scope.selectedCountry = $scope.netSales[index];
		showYearlyDistribution($scope.selectedCountry.country_data.yearly_distribution);

	};

	$scope.loadData = function () {
		$scope.loading = true;
		$http.get('/api/net-sales')
			.success(function (data) {
				$scope.netSales = data;
				$scope.selectCountryWithIndex(0);
				$scope.loading = false;
			})
			.error(function (err) {
				console.error(err);
				$scope.loading = false;
			});
	};


	// Carousel
	$scope.swipeLeft = function () {
    	$('#country-carousel').carousel('next');
	};
	$scope.swipeRight = function () {
		$('#country-carousel').carousel('prev');
	};
	
	$('#country-carousel').on('slide.bs.carousel', function (event) {

	  var next = $(event.relatedTarget);
	  var to = next.index();

	  // Wait for the animation to be finished
	  $timeout(function () {
		  $scope.$apply(function () {
		  	$scope.selectCountryWithIndex(to);
		  });
		}, 650);
	});

	// Initiate
	$scope.loadData();
}]);