angular.module("churchs").config(function ($routeProvider) {
	$routeProvider.when("/igrejas", {
		templateUrl: "view/igrejas.html",
		controller: "igrejaListCtrl",
		resolve: {
			igrejas: function (igrejasAPI) {
				return igrejasAPI.getIgrejas();
			},
			cidades: function (cidadesAPI) {
				return cidadesAPI.getCidades();
			}
		}
	});
    
    $routeProvider.when("/novaIgreja", {
		templateUrl: "view/novaIgreja.html",
		controller: "igrejaEditCtrl",
		resolve: {
			cidades: function (cidadesAPI) {
				return cidadesAPI.getCidades();
			}
		}
	});
    
	$routeProvider.when("/detalhesIgreja/:id", {
		templateUrl: "view/detalhesIgreja.html",
		controller: "detalhesIgrejaCtrl",
		resolve: {
			igreja: function (igrejasAPI, $route) {
				return igrejasAPI.getIgreja($route.current.params.id);
			}
		}
	});    
    
	$routeProvider.when("/error", {
		templateUrl: "view/error.html"
	});
	$routeProvider.otherwise({redirectTo: "/igrejas"});
});