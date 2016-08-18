angular.module("churchs").controller("igrejaEditCtrl", function ($scope, $location, igrejasAPI, cidades) {
	$scope.cidades = cidades.data;
    $scope.igreja = {
        "nome": null,
        "logradouro": null,
        "complemento": null,
        "bairro": null,
        fk_cidade: null,
        "cep": null,    
        "latitude": null,
        "longitude": null,
        "telefone": null,
        "email": null
    }
    
    $scope.map = {
        zoom: 5,
        center: {
            latitude: -16.047226,
            longitude: -49.558697
        }
    };
    
    $scope.options = {
        scrollwheel: false
    };
    
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
        id: 0,
        coords: {
            latitude: -16.047226,
            longitude: -49.558697
        },
        options: {
            draggable: true
        },
        events: {
            dragend: function (marker, eventName, args) {
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                
                $scope.igreja.latitude = lat;
                $scope.igreja.longitude = lon;

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "Latitude: " + $scope.marker.coords.latitude + ' ' + '\nLongitude: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };
    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
        if (_.isEqual(newVal, oldVal))
            return;
        $scope.coordsUpdates++;
    });
    
    
	$scope.adicionarIgreja = function (igreja) {
		igrejasAPI.saveIgreja(igreja).success(function (data) {
			delete $scope.igreja;
			$scope.igrejaForm.$setPristine();
			$location.path("/igrejas");
		});
	};
});