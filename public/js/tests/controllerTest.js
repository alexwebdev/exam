describe("Controller test", function() {

	var mockScope, controller, backend;

	beforeEach(module("impaqApp"));

	beforeEach(angular.mock.inject(function($httpBackend) {
		backend = $httpBackend;
		backend.expect("GET", "http://localhost:2403/users").respond(
			[
				{'name': 'John', 'surname': 'Kowalski', 'birthdate': '1980-01-01', 'mobile': '988775545'},
				{'name': 'Brit', 'surname': 'Wazalsky', 'birthdate': '1980-01-01', 'mobile': '110029993'},
				{'name': 'Mike', 'surname': 'Wazalsky', 'birthdate': '1980-01-01', 'mobile': '455441551'}
			]
		);
	}));

	beforeEach(angular.mock.inject(function($controller, $rootScope, $resource) {
		mockScope = $rootScope.$new();
		$controller("mainCtrl", {
			$scope: mockScope,
			$resource: $resource
		});
		backend.flush();
	}));

	it("array creation", function() {
		expect(mockScope.editedUsers.length).toEqual(0);
	});

	it("ajax request", function() {
		backend.verifyNoOutstandingExpectation();
	});

	it("process data", function() {
		expect(mockScope.users).toBeDefined();
		expect(mockScope.users.length).toEqual(3);
	});

	it("correct data", function() {
		expect(mockScope.users[0].name).toEqual("John");
		expect(mockScope.users[1].name).toEqual("Brit");
		expect(mockScope.users[2].name).toEqual("Mike");
	});

});