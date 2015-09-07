angular.module('impaqApp', [])

	.constant("usersUrl", "http://localhost:2403/users")




	.controller('mainCtrl', function($scope, $http, usersUrl) {

		$scope.data = {};

		$http.get(usersUrl)
			.success(function(data) {
				console.log(data);
				$scope.data.users = data;
			})
			.error(function(error) {
				$scope.data.error = error;
			});

	});