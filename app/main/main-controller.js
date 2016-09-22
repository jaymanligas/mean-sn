(function(){
  console.log('called MainController');

  angular.module('SocialNetwork')
  .controller('MainController',['$scope','$http','$interval',function($scope,$http,$interval){

      if(localStorage['User-Data'] !== undefined) {
        $scope.user = JSON.parse(localStorage['User-Data']);
        $scope.isLoggedin = true;

      }else {
        $scope.isLoggedin = false;
      }
      $scope.sendContent = function($event) {
        if($event.which === 13 || $event == 'click') {
            var req = {
              user: $scope.user.username || $scope.user.email,
              userId : $scope.user._id,
              userImage  : $scope.user.image,
              content: $scope.newContent
            }

            $http.post('/api/post/sendContent' , req).success(function(res) {
              $scope.newContent = "";
              $scope.posts = res;
            }).error(function(err) {
              console.error(err);
            })
        }
      }


      function getAllPosts(initial) {
        $http.get('/api/post/get').success(function(res) {
          if(initial) {
            $scope.posts = res;
          } else {
            $scope.newPosts = res;
          }
        }).error(function(err) {
          console.error(err);
        })
      }

      getAllPosts(true);


  }]);
}());
