const mongoose = require('mongoose');
const config = require('./config');

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

module.exports = class MongoContainer {

    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async save(newObject) {
        try {
            let doc = await this.collection.create(newObject);
            doc = asPOJO(doc);
            renameField(doc, '_id', 'id');
            removeField(doc, '__v');
            return doc;
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`);
        }
    }

    async updateById(id, newObject) {
        try {
            renameField(newObject, 'id', '_id')
            const { n, nModified } = await this.collection.replaceOne({ '_id': nuevoElem._id }, nuevoElem);
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado');
            } else {
                renameField(newObject, '_id', 'id');
                removeField(newObject, '__v');
                return asPOJO(newObject);
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`);
        }
    }

    async getById(id) {
        try {
            const docs = await this.collection.find({ '_id': id }, { __v: 0 });
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado');
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            let docs = await this.collection.find({}, { __v: 0 }).lean();
            docs = docs.map(asPOJO);
            docs = docs.map(d => renameField(d, '_id', 'id'));
            return docs;
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const { n, nDeleted } = await this.collection.deleteOne({ '_id': id });
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado');
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany({});
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }
}

const asPOJO = obj => JSON.parse(JSON.stringify(obj));

const renameField = (record, from, to) => {
    record[to] = record[from];
    delete record[from];
    return record;
}
const removeField = (record, field) => {
    const value = record[field];
    delete record[field];
    return value;
}