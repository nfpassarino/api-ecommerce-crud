const express = require('express');
const app = express();
const logger = require('morgan');

const productRoutes = require('./product/productRoutes');
const cartRoutes = require('./cart/cartRoutes');

const PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.json());

app.get('/', async (req, res) => {
    res.json({
        response: 'index',
    });
});

app.use('/api/productos', productRoutes);
app.use('/api/carrito', cartRoutes);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
