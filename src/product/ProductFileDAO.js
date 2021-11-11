const FileContainer = require('../containers/FileContainer');

module.exports = class ProductFileDAO extends FileContainer {

    constructor() {
        super.initialize('productos.txt');
    }
}