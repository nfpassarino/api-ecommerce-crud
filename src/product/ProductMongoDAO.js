const MongoContainer = require('../containers/MongoContainer');

module.exports = class ProductMongoDAO extends MongoContainer {

    constructor() {
        super('productos', {
            "nombre": { type: String, required: true },
            "codigo": { type: String, required: true },
            "precio": { type: Number, required: true },
            "stock": { type: Number, required: true },
            "descripcion": { type: String, required: true },
            "foto": { type: String, required: true },
        });
    }
}