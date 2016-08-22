angular.module("churchs").factory("igrejasAPI", function ($http, config) {
	var _getIgrejas = function () {
		return $http.get(config.baseUrl + "/igrejas");
	};

	var _getIgreja = function (id) {
		return $http.get(config.baseUrl + "/igrejas/" + id);
	};

	var _saveIgreja = function (igreja) {
		return $http.post(config.baseUrl + "/igrejas", JSON.stringify(igreja));
	};
    
    var _deleteIgreja = function (id) {
        return $http.delete(config.baseUrl + "/igrejas/" + id);
    };

	return {
		getIgrejas: _getIgrejas,
		getIgreja: _getIgreja,
		saveIgreja: _saveIgreja,
        deleteIgreja: _deleteIgreja
	};
});