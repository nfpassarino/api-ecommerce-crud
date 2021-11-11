const FirebaseContainer = require('../containers/FirebaseContainer');

module.exports = class ProductFirebaseDAO extends FirebaseContainer {

    constructor() {
        super('productos');
    }
}