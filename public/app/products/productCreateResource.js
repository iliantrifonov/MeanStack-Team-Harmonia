app.factory('ProductsCreateResource', function($http) {
    return{
        create: function create(product) {
            $http.post('http://localhost:12344/api/products', product);
        }
    }
});