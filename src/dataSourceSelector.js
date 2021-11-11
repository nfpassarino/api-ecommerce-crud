let productDAO, cartDAO;

switch(process.env.PERS) {
    case 'txt':
    default:
        const { default: ProductFileDAO } = await import('./product/ProductFileDAO');
        const { default: CartFileDAO } = await import('./cart/CartFileDAO');

        productDAO = new ProductFileDAO();
        cartDAO = new CartFileDAO();
        break;

    case 'firebase':
        const { default: ProductFirebaseDAO } = await import('./product/ProductFirebaseDAO');
        const { default: CartFirebaseDAO } = await import('./cart/CartFirebaseDAO');

        productDAO = new ProductFirebaseDAO();
        cartDAO = new CartFirebaseDAO();
        break;

    case 'mongodb':
        const { default: ProductMongoDAO } = await import('./product/ProductMongoDAO');
        const { default: CartMongoDAO } = await import('./cart/CartMongoDAO');

        productDAO = new ProductMongoDAO();
        cartDAO = new CartMongoDAO();
        break;
}

module.exports = {
    productDAO,
    cartDAO,
}