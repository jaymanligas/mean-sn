(function(){
  angular.module('SocialNetwork')
  .controller("ProfileController",
  ['Upload','$scope','$state', '$http', function(Upload,$scope, $state , $http){


    $scope.$watch(function(){
      return $scope.file;
    },function(){
      $scope.upload($scope.file);
    });

    $scope.user = JSON.parse(localStorage['User-Data']) || undefined;

    $scope.upload = function(file) {
      if(file) {
        Upload.upload({
          url: 'api/profile/updatePhoto' ,
          method: 'post',
          data : { userId: $scope.user._id},
          file: file
        }).progress(function(evt){
          console.log("firing")
        }).success(function(data){
          console.log('data');
          $scope.user.image = data.image;
          localStorage.setItem('User-Data', JSON.stringify($scope.user));
        }).error(function(error){
          console.log(error)
        });
      }
    }

    $scope.updateUsername = function() {
      $http.post('api/profile/updateUsername', { userId : $scope.user._id , username : $scope.user.username}).success(function(res){
        console.log(res)
        localStorage.setItem('User-Data', JSON.stringify($scope.user));
      }).error(function(err) {
        console.error(err);
      });
    }

    $scope.updateBio = function() {
      $http.post('api/profile/updateBio', { userId : $scope.user._id , bio : $scope.user.bio}).success(function(res){
        console.log(res)
        localStorage.setItem('User-Data', JSON.stringify($scope.user));
      }).error(function(err) {
        console.error(err);
      });
    }

  }]);
}());
