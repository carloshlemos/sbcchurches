var myApp = angular.module("myApp", ['uiGmapgoogle-maps']).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            brazil: true
        });
    }]
);

myApp.controller("mapsCtrl", function($scope) {
    $scope.map = { center: { latitude: -16.622451, longitude: -49.317838 }, zoom: 5 };
});