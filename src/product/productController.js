const { productDAO, cartDAO } = require('../dataSourceSelector');

exports.fetchAllProducts = async () => {
    return productDAO.getAll();
};

exports.fetchProductById = async (id) => {
    const obj = productDAO.getById(Number(id));
    return obj;
};

exports.writeNewProduct = async (newProduct) => {
    const product = productDAO.save(newProduct);
    return product;
};

exports.updateProduct = async (id, newProduct) => {
    const product = productDAO.updateById(Number(id), newProduct);
    return product;
};

exports.deleteProduct = async (id) => {
    productDAO.deleteById(Number(id));
    return await this.fetchAllProducts();
};
