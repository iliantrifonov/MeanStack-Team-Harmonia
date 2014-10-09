app.controller('ProductsListCtrl', function($scope, cachedProducts) {
    $scope.products = cachedProducts.query();
});