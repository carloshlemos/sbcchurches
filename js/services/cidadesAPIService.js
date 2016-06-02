angular.module("churchs").service("cidadesAPI", function ($http, config) {
	this.getCidades = function () {
		return $http.get(config.baseUrl + "/cidades");
	};
});