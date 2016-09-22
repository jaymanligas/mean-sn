(function(){
	angular.module('SocialNetwork')
	.controller("SignUpController",['$scope','$state', '$http',function($scope, $state , $http){
		console.log('why!');

		$scope.createUser = function(){
			console.log($scope.newUser);
			$http.post('api/user/signup', $scope.newUser).success(function(res){
	        $scope.message = res.message;
					$scope.messageType = res.messageType;
			}).error(function(err){
				console.log('Error');
			})
		}
	}]);
}());
