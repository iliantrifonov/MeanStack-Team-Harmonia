app.factory('MessagesResourse', function($http, $q) {
    var get = function () {
        var deferred = $q.defer();

        $http({ url: '/api/messages', method: 'GET' })
            .success(function (data) {
                deferred.resolve(data);
            }, function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    var post = function (message) {
        var deferred = $q.defer();

        $http({ url: '/api/messages', data: message ,method: 'POST' })
            .success(function (data) {
                deferred.resolve(data);
            }, function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };
    return {
        get: get,
        post: post
    };
});