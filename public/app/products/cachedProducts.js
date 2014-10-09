app.factory('cachedProducts', function(ProductsResource) {
    var cachedProducts;

    return {
        query: function() {
            if (!cachedProducts) {
                cachedProducts = ProductsResource.ProductsResource.query();
            }

            return cachedProducts;
        }
    }
});