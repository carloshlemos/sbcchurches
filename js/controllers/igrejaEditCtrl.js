angular.module("churchs").controller("igrejaEditCtrl", function ($scope, igrejasAPI, cidades) {
	$scope.cidades = cidades.data;

	$scope.adicionarIgreja = function (igreja) {
		igrejasAPI.saveIgreja(igreja).success(function (data) {
			delete $scope.igreja;
			$scope.igrejaForm.$setPristine();
			$location.path("/igrejas");
		});
	};
});