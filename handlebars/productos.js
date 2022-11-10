const { promises: fs } = require ('fs')

class Productos {
    constructor(path) {
        this.path = path;
        this.productos = [];
    }

    async save(obj) {
        const products = await this.getAll();

        let newId;
        if(products.length === 0) {
            newId = 1;
        } else {
            newId = products[products.length - 1].id + 1;
        }

        const newObj = {...obj, id: newId}
        products.push(newObj)
        console.log(products)

        try {
            await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error('Ocurrió un error0')
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            const filteredProduct = await products.slice([id-1], [id])
            console.log(filteredProduct)
            return (filteredProduct);
        } catch (error) {
            console.log('Producto no encontrado', error)
            return [];
        }
    }

    async getAll() {
        try {
            const file = await fs.readFile(`./${this.path}`, "utf-8");   
            return JSON.parse(file);
        } catch (error) {
            console.log('No hay productos', error)
            return [];
        }

    }

    async deleteById (id) {
        try {
            const products = await this.getAll();
            const newProducts = products.splice([id-1], 1);
            await fs.writeFile(`./${this.path}`, JSON.stringify(newProducts, null, 2));
            console.log(products)
        } catch (error) {
            console.log('Producto no encontrado', error)
        }

    }

    async deleteAll () {
        try {
            await fs.writeFile(`./${this.path}`, JSON.stringify([], null, 2));
        } catch (error) {
            console.log('Ocurrió un error', error)
        }
    }
}

const newContainer = new Productos(`./products.txt`)
const products = newContainer.getAll()

//newContainer.save({name: "trial", price: 2000, thumbnail: "http://placekitten.com/g/200/300"})
// console.log(products)
//newContainer.getById(3)

//export default Productos;

module.exports = Productos;