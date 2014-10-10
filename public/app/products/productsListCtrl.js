app.controller('ProductsListCtrl', function($scope, cachedProducts, ProductsResource, auth, notifier) {
    //$scope.products = cachedProducts.query();
    $scope.isAuthenticated = auth.isAuthenticated();

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

    $scope.saveToBasket = function(product) {
        ProductsResource.addToBasket(product._id).then(function(data){
            notifier.success("Product added successfully");
        });
    }
});