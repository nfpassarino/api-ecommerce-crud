const express = require('express');
const productRoutes = express.Router();
const productController = require('./productController');

productRoutes.get('/', (req, res) => {
    productController.fetchAllProducts()
        .then(data => res.json({
            message: 'Lista de productos',
            data: data
        }))
        .catch(e => console.error(e));
});

productRoutes.get('/:id', (req, res) => {
    const { id } = req.params;
    productController.fetchProductById(id)
        .then(result => {
            result === null
                ? res.json({
                    message: 'Producto no encontrado :(',
                })
                : res.json({
                    message: 'Producto encontrado',
                    data: result
                })
        })
        .catch(e => console.error(e));
});

productRoutes.post('/', (req, res) => {
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        const newProduct = req.body.product;
        productController.writeNewProduct(newProduct)
            .then(id => {
                productController.fetchProductById(id)
                    .then(pro => res.json({
                        message: 'Producto guardado',
                        data: pro
                    }))
            })
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

productRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        const newProduct = req.body.product;
        productController.updateProduct(id, newProduct)
            .then(id => {
                productController.fetchProductById(id)
                    .then(pro => res.json({
                        message: 'Producto actualizado',
                        data: pro
                    }))
            })
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

productRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        productController.deleteProduct(id)
            .then(all => res.json({
                message: 'Producto eliminado',
                data: all
            }))
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

module.exports = productRoutes;
