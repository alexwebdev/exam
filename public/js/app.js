angular.module('impaqApp', ['ngResource'])

	.constant("usersUrl", "http://localhost:2403/users/")
	.controller('mainCtrl', function($scope, $resource, usersUrl) {

		$scope.usersResource = $resource(usersUrl + ":id", {id: "@id"});
		$scope.editedUsers = [];

		/**
		 * fetches users data into collection
		 * @return {[type]} [description]
		 */
		$scope.listUsers = function() {
			$scope.users = $scope.usersResource.query();
		};

		/**
		 * enables edit fields for a user to be updated
		 * @param  {[type]} user [description]
		 * @return {[type]}      [description]
		 */
		$scope.startEdit = function(user) {
			$scope.editedUsers.push(user);
		};

		/**
		 * updates user model
		 * @param  {[type]} user [description]
		 * @return {[type]}      [description]
		 */
		$scope.updateUser = function(user) {
			user.$save();
			$scope.editedUsers.splice($scope.editedUsers.indexOf(user), 1);
		};


		/**
		 * disables edit mode
		 * @param  {[type]} user [description]
		 * @return {[type]}      [description]
		 */
		$scope.cancelEdit = function(user) {
			$scope.editedUsers.splice($scope.editedUsers.indexOf(user), 1);
		};

		/**
		 * deletes user from collection
		 * @param  {[type]} user [description]
		 * @return {[type]}      [description]
		 */
		$scope.deleteUser = function(user) {
			user.$delete().then(function() {
				$scope.users.splice($scope.users.indexOf(user), 1);
			});
		};

		/**
		 * checks whether current user is being edited
		 * @param  {[type]}  user [description]
		 * @return {Boolean}      [description]
		 */
		$scope.isEdited = function(user) {
			return $scope.editedUsers.indexOf(user) !== -1;
		};

		/**
		 * enables edit mode for selected users
		 * @return {[type]} [description]
		 */
		$scope.editSelectedUsers = function() {
			$scope.editedUsers = [];

			for (var i=0; i<$scope.users.length; i++) {
				if ($scope.users[i].changing) $scope.editedUsers.push($scope.users[i]);
			}
		};


		$scope.listUsers();

	});