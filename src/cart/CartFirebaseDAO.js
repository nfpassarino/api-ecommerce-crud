import FirebaseContainer from '../containers/FirebaseContainer';

module.exports = class CartFirebaseDAO extends FirebaseContainer {

    constructor() {
        super('carritos');
    }
}