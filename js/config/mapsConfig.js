angular.module("churchs").config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);