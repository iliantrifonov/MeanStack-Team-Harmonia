/**
 * Created by Home on 10.10.2014 г..
 */
app.controller('MessagesCtrl', function($scope, $location, notifier, identity, auth, MessagesResourse) {

    console.dir(MessagesResourse);
    $scope.identity = identity;

    $scope.auth = auth;

    MessagesResourse.get().then(function (data){
         $scope.messages = data;
    });

    $scope.send = function () {
        MessagesResourse.post($scope.message);
        $location.path('/messages');
    };
})