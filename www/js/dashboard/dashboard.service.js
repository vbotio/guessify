angular.module('starter.controllers', ['ionic'])
.factory("dashboardService", ['$http', '$rootScope', function($http, $rootScope) {
	return {
		getData: function() {
			return $http.get($rootScope.apiUrl + "all").then(function(response) {
				return response.data;
			})
		}
	}
}]);
