const { promises: fs } = require ('fs')

class MensajesChat {
    constructor(path) {
        this.path = path;
        this.messages = [];
    }

    async getMessages() {
        try {
            const file = await fs.readFile(`./${this.path}`, "utf-8");   
            return JSON.parse(file);
        } catch (error) {
            console.log('No hay mensajes', error)
            return [];
        }

    }

    async save(msj) {
        const mensajes = await this.getMessages();

        mensajes.push(msj)
        console.log(mensajes)

        try {
            await fs.writeFile(`./${this.path}`, JSON.stringify(mensajes, null, 2));
            return msj;
        } catch (error) {
            throw new Error('Ocurrió un error')
        }
    }
}

module.exports = MensajesChat;