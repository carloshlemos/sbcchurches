angular.module("churchs").controller("detalhesIgrejaCtrl", function ($scope, igreja) {
    $scope.igreja = igreja.data;

    $scope.map = {
        center: {
            latitude: $scope.igreja.latitude,
            longitude: $scope.igreja.longitude
        },
        zoom: 6
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
        options: {
            draggable: true
        },
        events: {
            dragend: function (marker, eventName, args) {
                $log.log('marker dragend');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
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
});