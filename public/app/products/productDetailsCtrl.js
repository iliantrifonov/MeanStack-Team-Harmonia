app.controller('ProductDetailsCtrl', function($scope, $routeParams, cachedProducts) {
    //$scope.course = CourseResource.get({id: $routeParams.id});
    $scope.product = cachedProducts.query().$promise.then(function(collection) {
        collection.forEach(function(product) {
            if (product._id === $routeParams.id) {
                $scope.product = product;
            }
        })
    })
});