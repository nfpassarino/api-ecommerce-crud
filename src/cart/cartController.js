const { productDAO, cartDAO } = require('../dataSourceSelector');
const productController = require('./../product/productController');

exports.fetchAllCarts = async () => {
    return cartDAO.getAll();
};

exports.fetchCartById = async (id) => {
    const obj = cartDAO.getById(Number(id));
    return obj;
};

exports.writeNewCart = async (newCart) => {
    const cart = await cartDAO.save(newCart);
    return cart;
};

exports.addProductToCart = async (cartId, productId) => {
    const product = await productController.fetchProductById(productId);
    const cart = await cartDAO.getById(Number(cartId));
    cart.productos.push(product);
    const newCart = await cartDAO.updateById(Number(cartId), cart);
    return newCart;
};

exports.deleteProductToCart = async (cartId, productId) => {
    const cart = await cartDAO.getById(Number(cartId));
    const product = await productController.fetchProductById(productId);
    const cartWithoutProduct = {
        productos: cart.productos.filter(prod => prod.nombre !== product.nombre),
    }
    const newCart = await cartDAO.updateById(Number(cartId), cartWithoutProduct);
    return newCart;
};

exports.deleteCart = async (id) => {
    await cartContainer.deleteById(Number(id));
    return await this.fetchAllCarts();
};
