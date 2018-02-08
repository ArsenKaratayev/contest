var app = angular
	.module("Example",['ngRoute'])
		.config(function($routeProvider){
    		$routeProvider
            .when("/addUser", {
                templateUrl : "views/addUser.html",
                controller : "addUserController"
            })
            .when("/usersList", {
                templateUrl : "views/usersList.html",
                controller : "usersListController"
            })
            // .when("/item", {
            //     templateUrl : "views/item.html",
            //     controller : "itemController"
            // })
            .when("/editUser", {
                templateUrl : "views/editUser.html",
                controller : "editUserController"
            })
		})
		.controller("mainController", function($scope, $location, $http, $rootScope) {
			$scope.goTo = function(url) {
				$location.path(url);
			}
		})