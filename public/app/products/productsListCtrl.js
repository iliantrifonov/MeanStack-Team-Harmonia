app.controller('ProductsListCtrl', function($scope, cachedProducts, ProductsResource) {
    //$scope.products = cachedProducts.query();

    (function(){
        ProductsResource.getProducts({page:0}).then(function (data) {
            $scope.products = data;
        });
    }());

    $scope.getProducts = function(searchParams) {
        if(!searchParams.hasOwnProperty('page')){
            searchParams['page'] = 0;
        }
        ProductsResource.getProducts(searchParams).then(function (data) {
            $scope.products = data;
        })
    }
});