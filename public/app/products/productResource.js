app.factory('ProductsResource', function($resource, $http, $q) {
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

    return {
        ProductsResource: ProductsResource,
        getProducts: getProducts
    };
})