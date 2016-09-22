(function(){

	angular.module('SocialNetwork',['ui.router','ngFileUpload'])
	.config(function($stateProvider ,$urlRouterProvider){

		$urlRouterProvider.otherwise("/");

		$stateProvider.state('sign-up',{
			url:"/signup",
			templateUrl: "app/signup/signup.html",
			controller:"SignUpController"
		}).state('edit-profile',{
			url:"/edit-profile",
			templateUrl: "app/profile/profile.html",
			controller:"ProfileController"
		}).state('log-out',{
			url:"/log-out",
			templateUrl: "app/navigation/logout.html",
			controller:"NavigationController"
		}).state('main',{
			url:"/",
			templateUrl: "app/main/main.html",
			controller:"MainController"
		});

	});

}());
