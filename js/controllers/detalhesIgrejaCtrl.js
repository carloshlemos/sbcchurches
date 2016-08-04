angular.module("churchs").controller("detalhesIgrejaCtrl", function ($scope, igrejasAPI, igreja) {
    $scope.igreja = igreja.data;

    $scope.map = {
        center: {
            latitude: $scope.igreja.latitude,
            longitude: $scope.igreja.longitude
        },
    };
    
    $scope.options = {
        scrollwheel: false
    };
    
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
        id: 0,
        coords: {
            latitude: $scope.igreja.latitude,
            longitude: $scope.igreja.longitude
        },
        title: $scope.igreja.nome,
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
                    labelContent: "Latitude: " + $scope.marker.coords.latitude + ' ' + 'Longitude: ' + $scope.marker.coords.longitude,
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
    
	$scope.alterarIgreja = function (igreja) {
	
	};    
});