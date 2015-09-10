describe("Controller test", function() {

	var mockScope, controller, backend;

	beforeEach(module("impaqApp"));

	// beforeEach(function() {
	// 	angular.module("impaqApp", ["ngResource"]);
	// });

	beforeEach(angular.mock.inject(function($httpBackend) {
		backend = $httpBackend;
		backend.expect("GET", "http://localhost:2403/users").respond(
			[
				{'name': 'John', 'surname': 'Kowalski', 'mobile': '988775545'},
				{'name': 'Brit', 'surname': 'Wazalsky', 'mobile': '110029993'}
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

	it("ajax request", function() {
		backend.verifyNoOutstandingExpectation();
	});

	it("process data", function() {
		expect(mockScope.users).toBeDefined();
		expect(mockScope.users.length).toEqual(3);
	});

});