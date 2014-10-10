app.controller('AddProductCtrl', function($scope, ProductsCreateResource, auth, $location, notifier) {
    if(auth.isAuthorizedForRole('seller') === true || auth.isAuthorizedForRole('admin') === true)
    {
        function saveProduct(product){
            ProductsCreateResource.create(product);
            notifier.success('Product Added successfully!');
            $scope.product = '';
        }

        function cancel(){
            alert("Form cancelled");
        }

        $scope.save = saveProduct;
        $scope.cancel = cancel;
    }
    else{
        $location.path('/');
    }

});