(function(){
  console.log('called NavigationController')

  angular.module('SocialNetwork')
  .controller('NavigationController',['$scope','$http','$state',function($scope,$http,$state){

    if(localStorage['User-Data']) {
      $scope.isLoggedin = true;
    } else {
      $scope.isLoggedin = false;
    }

    $scope.logUserIn = function(){
      console.log('Login');
      console.log($scope.login);

      $http.post('api/user/login', $scope.login).success(function(res){
        console.log(res)
        localStorage.setItem('User-Data', JSON.stringify(res));
        $scope.isLoggedin = true;
      }).error(function(err) {
          localStorage.clear();
        console.error(err);
        $scope.isLoggedin = false;
      });
    }

    $scope.logOut = function(){
      $scope.isLoggedin = false;
      localStorage.clear();
      console.log('logOut User-Data' , localStorage.getItem('User-Data'));
    }



  }]);
}());
