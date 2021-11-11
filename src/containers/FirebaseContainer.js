const admin = require('firebase-admin');
const config = require('./config');

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

module.exports = class FirebaseContainer {

    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async save(newObject) {
        try {
            const saved = await this.collection.add(newObject);
            return { ...newObject, id: saved.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`);
        }
    }

    async updateById(id, newObject) {
        try {
            const updated = await this.collection.doc(id).set(newObject);
            return updated;
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`);
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró en la colección`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            const result = [];
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() });
            });
            return result;
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const item = await this.collection.doc(id).delete();
            return item;
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }

    async deleteAll() {
        try {
            this.collection.onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    ref.doc(doc.id).delete();
                });
            });
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }
}