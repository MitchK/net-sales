app.controller('MainController', ['$scope', '$http' , function ($scope, $http) {

	$scope.netSales = [];

	$http.get('/api/net-sales')
		.success(function (data) {
			$scope.netSales = data;
		});
}]);