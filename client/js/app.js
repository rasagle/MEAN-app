var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.bootstrap',
	'ngResource',
	'ngAnimate',
	'btford.socket-io']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	
	$locationProvider.html5Mode({enabled: true, requiredBase: false});

	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'homeController'
	})
	.when('/about', {
		templateUrl: 'partials/about.html',
		controller: 'aboutController'
	})
	.when('/contact', {
		templateUrl: 'partials/contact.html',
		controller: 'contactController'
	})
	.when('/projects',{
		templateUrl: 'partials/projects.html'
	})
	.when('/projects/customerapi',{
		templateUrl: 'partials/projects/customerapi.html',
		controller: 'customerapiController'
	})
	.when('/projects/chat', {
		templateUrl: 'partials/projects/chat.html',
		controller: 'chatController'
	})
	.otherwise({
		redirectTo: '/home'
	});
}]);

myApp.filter('startFrom', function(){
	return function(data, start){
		return data.slice(start);
	}
});