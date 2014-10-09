app.controller('AddProductCtrl', function($scope, ProductsCreateResource, auth) {
    function saveProduct(product){
        console.log('Product added');
        console.log(product);
        ProductsCreateResource.create(product);
    }

    function cancel(){
        alert("Form cancelled");
    }

    $scope.save = saveProduct;
    $scope.cancel = cancel;
});