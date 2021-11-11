import MongoContainer from '../containers/MongoContainer';

module.exports = class CartMongoDAO extends MongoContainer {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true },
        });
    }
}