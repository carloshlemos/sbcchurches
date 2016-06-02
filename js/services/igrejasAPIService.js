angular.module("churchs").factory("igrejasAPI", function ($http, config) {
	var _getIgrejas = function () {
		return $http.get(config.baseUrl + "/igrejas");
	};

	var _getIgreja = function (id) {
		return $http.get(config.baseUrl + "/igrejas/" + id);
	};

	var _saveIgreja = function (contato) {
		return $http.post(config.baseUrl + "/igrejas", contato);
	};

	return {
		getIgrejas: _getIgrejas,
		getIgreja: _getIgreja,
		saveIgreja: _saveIgreja
	};
});