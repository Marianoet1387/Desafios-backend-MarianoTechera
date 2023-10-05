const { promises: fs } = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }
        const id = this.creoID();
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        products.push(newProduct);
        await this.saveProductsToFile(products);
    }

    async getProducts() {
        try {
            const content = await fs.readFile(this.path, "utf-8");
            return JSON.parse(content);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);
        if (!product) {
            console.log("Product not found");
        } else {
            console.log("Product found", product);
        }
    }

    async updateProduct(id, updatedProduct) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct, id };
            await this.saveProductsToFile(products);
            console.log("Producto actualizado correctamente", products[index]);
        } else {
            console.log(`Product not found, id: ${id}`);
        }
    }     
 
    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            await this.saveProductsToFile(products);
            console.log("Se ha borrado correctamente el producto");
        } else {
            console.log("No se ha podido borrar el producto");
        }
    }

    async saveProductsToFile(products) {
        const content = JSON.stringify(products, null,"\t");
        await fs.writeFile(this.path, content, "utf - 8");
    }
    creoID() {
        return parseInt(Math.random() * 100000);
    }
}

module.exports = ProductManager;