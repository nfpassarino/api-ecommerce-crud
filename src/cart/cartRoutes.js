const express = require('express');
const cartRoutes = express.Router();
const cartController = require('./cartController');

cartRoutes.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    cartController.fetchCartById(id)
        .then(result => {
            result === null
                ? res.json({
                    message: 'Carrito no encontrado :(',
                })
                : res.json({
                    message: 'Carrito encontrado',
                    data: result.productos
                })
        })
        .catch(e => console.error(e));
});

cartRoutes.post('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params;
    cartController.addProductToCart(id, id_prod)
        .then(result => {
            result === null
                ? res.json({
                    message: 'Producto no encontrado :(',
                })
                : res.json({
                    message: 'Producto agregado',
                    data: result
                })
        })
        .catch(e => console.error(e));
});

cartRoutes.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params;
    cartController.deleteProductToCart(id, id_prod)
        .then(result => {
            result === null
                ? res.json({
                    message: 'Producto no encontrado :(',
                })
                : res.json({
                    message: 'Producto eliminado',
                    data: result
                })
        })
        .catch(e => console.error(e));
});

cartRoutes.post('/', (req, res) => {
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        const newCart = {
            productos: [],
        };
        cartController.writeNewCart(newCart)
            .then(id => res.json({
                            message: 'Carrito guardado',
                            data: id
                        })
            )
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

cartRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        cartController.deleteCart(id)
            .then(all => res.json({
                message: 'Carrito eliminado',
            }))
            .catch(e => console.error(e));
    } else {
        res.json({
            error: -1,
            description: 'ruta/metodo no autorizada',
        });
    }
});

module.exports = cartRoutes;
