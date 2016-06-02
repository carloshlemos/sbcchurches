angular.module("churchs").controller("igrejaListCtrl", function ($scope, igrejas, cidades, $filter) {
	$scope.app = $filter('upper')("SBC-Churchs - Cadastro de Igrejas");
	$scope.igrejas = igrejas.data;
	$scope.cidades = cidades.data;
    
	var init = function () {
	};  

	$scope.verificarIgrejaSelecionada = function (igrejas) {
		$scope.hasIgrejaSelecionada = igrejas.some(function (igreja) {
			return igreja.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
    
	init();
});