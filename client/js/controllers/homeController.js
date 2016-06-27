myApp.controller('homeController', ['$scope', function($scope){
	$scope.myInterval = 3000;
	$scope.noWrapSlides = false;
	$scope.active = 0;

	$scope.slides = [{
		image:'../../img/angular.png',
		text: 'Sup M8',
		id: 1
	},
	{
		image: '../../img/node.png',
		text: 'Sup M8',
		id: 2
	},
	{
		image: '../../img/fullstack.png',
		text: 'Sup M8',
		id: 3
	}];
}]);