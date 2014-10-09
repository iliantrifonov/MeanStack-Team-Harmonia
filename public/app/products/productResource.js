app.factory('ProductsResource', function($resource) {
    var ProductsResource = $resource('/api/products/:id', {id:'@id'}, { update: {method: 'GET', isArray: false}});

    return ProductsResource;
})