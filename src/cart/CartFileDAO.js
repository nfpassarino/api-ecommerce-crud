import FileContainer from '../containers/FileContainer';

module.exports = class CartFileDAO extends FileContainer {

    constructor() {
        super.initialize('carritos.txt');
    }
}