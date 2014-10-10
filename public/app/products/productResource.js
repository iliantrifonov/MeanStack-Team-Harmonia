app.factory('ProductsResource', function($resource, $http, $q, identity) {
    var ProductsResource = $resource('/api/products/:id', {id:'@id'}, { update: {method: 'GET', isArray: false}});

    var getProducts = function(searchOptions){

        var searchString = '?';

        for (var property in searchOptions) {
            if(searchOptions[property] != undefined) {
                searchString += property + '=' + searchOptions[property] + '&'
            }
        }

        searchString = searchString.substring(0, searchString.length - 1);

        var deffered = $q.defer();

        $http({method: 'GET', url: '/api/products/' + searchString}).
            success(function(data, status, headers, config) {
                deffered.resolve(data);
            }).
            error(function(data, status, headers, config) {
                deffered.resolve(data);
            });

        return deffered.promise;
    };

    var deleteProductFromBasket = function(productId){
        var deffered = $q.defer();

        $http({method: 'put', url: 'api/basket/', data: { productId: productId } , headers: {'Authorization': identity.currentUser._id}}).
            success(function(data) {
                deffered.resolve(data);
            }).
            error(function(data) {
                deffered.resolve(data);
            });

        return deffered.promise;
    }

    var addToBasket = function(productId){
        var deffered = $q.defer();

        $http({method: 'post',url: 'api/basket/', data: {productId: productId} , headers: {'Authorization': identity.currentUser._id}}).
            success(function(data) {
                deffered.resolve(data);
            }).
            error(function(data) {
                deffered.resolve(data);
            });

        return deffered.promise;
    }

    var getBasketContent = function(){
        var deffered = $q.defer();

        $http({method: 'get',url: 'api/basket/', headers: {'Authorization': identity.currentUser._id}}).
            success(function(data) {
                deffered.resolve(data);
            }).
            error(function(data) {
                deffered.resolve(data);
            });

        return deffered.promise;
    }

    return {
        ProductsResource: ProductsResource,
        getProducts: getProducts,
        addToBasket: addToBasket,
        getBasketContent: getBasketContent,
        deleteProductFromBasket: deleteProductFromBasket
    };
})