angular.module("churchs").controller("igrejaListCtrl", function ($scope, igrejas, cidades, igrejasAPI, $location) {
	$scope.app = "Igrejas do Sínodo Brasil Central";
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
    
    $scope.removerIgrejas = function (igrejas) {
		$scope.hasIgrejaSelecionada = igrejas.some(function (igreja) {
            if (igreja.selecionado){
                igrejasAPI.deleteIgreja(igreja.id).success(function (data) {
                    $scope.igrejas = igrejasAPI.getIgrejas().data;
                });                        
            }
		});        
    }
    
	init();
});