const fs = require('fs');
const path = require('path');
const moment = require('moment');
const fsPromises = fs.promises;

module.exports = class FileContainer {

    constructor(filePath, objects, lastId) {
        this.filePath = filePath;
        this.objects = objects;
        this.lastId = lastId;
    }
    
    static async initialize(fileName = '') {
        const filePath = path.resolve(fileName);
        if (fs.existsSync(filePath)) {
            const data = await fsPromises.readFile(filePath, 'utf-8');
            const objects = JSON.parse(data).objects;
            const lastId = objects.slice(-1)[0]?.id || 0;
            return new FileContainer(filePath, objects, lastId);
        } else {
            await fsPromises.writeFile(filePath, JSON.stringify({ objects: [] }, null, 2));
            return new FileContainer(filePath, [], 0);
        }
    }

    async save(newObject) {
        if(typeof newObject === 'object') {
            newObject['id'] = ++this.lastId;
            newObject['timestamp'] = moment();
            this.objects.push(newObject);
            await fsPromises.writeFile(this.filePath, JSON.stringify({ objects: this.objects }, null, 2));
            return newObject.id;
        }
        return null;
    }

    async updateById(id, newObject) {
        if(typeof id === 'number' && this.objects.length > 0 && id <= this.objects.length) {
            this.objects[id - 1] = {
                ...newObject,
                "id": id
            };
            await fsPromises.writeFile(this.filePath, JSON.stringify({ objects: this.objects }, null, 2));
            return id;
        }
        return null;
    }

    getById(id) {
        if(typeof id === 'number' && this.objects.length > 0 && id > 0 && id <= this.objects.length) {
            return this.objects[id - 1];
        } else {
            return null;
        }
    }

    getAll() {
        return this.objects;
    }

    async deleteById(id) {
        if(typeof id === 'number') {
            if(id <= this.objects.length) {
                let newArray = this.objects.filter(obj => obj !== this.objects[id - 1]);
                await fsPromises.writeFile(this.filePath, JSON.stringify({ objects: newArray }, null, 2));
            }
        }
    }

    async deleteAll() {
        await fsPromises.writeFile(this.filePath, JSON.stringify({ objects: [] }, null, 2));
    }

}
