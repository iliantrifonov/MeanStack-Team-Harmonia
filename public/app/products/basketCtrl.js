app.controller('BasketCtrl', function($scope, auth, $location, notifier, ProductsResource, auth) {
   // $scope.isAuthorizedForRole = identity.isAuthorizedForRole(role);
    $scope.isAuthenticated = auth.isAuthenticated();

    $scope.loadBasket = loadBasket()

    $scope.deleteFromBasket = function(product) {

        ProductsResource.deleteProductFromBasket(product._id).then(function(data){
            notifier.success(data);
            loadBasket();
        });
    }

    function loadBasket(){
        ProductsResource.getBasketContent().then(function (data) {
            $scope.yourBasketProducts = data;
            notifier.success("Your basket")
        });
    }
});