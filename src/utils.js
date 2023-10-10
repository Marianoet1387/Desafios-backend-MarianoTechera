import {promises as fs} from "fs"

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const { title, description, price, thumbnail, code, stock, status } = product;
        if (!title || !description || !price || !code || !stock || !status) {
            throw new Error("Todos los campos son obligatorios.");
        }
        const id = this.creoID();   
        const newProduct = { id, title, description, price, thumbnail, code, stock, status };
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
            throw new Error("Producto no encontrado");
        } else {
            console.log("Producto encontrado", product);
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
            console.log(`Producto no encontrado, id: ${id}`);
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

    async saveProductsToFile(path, products) {
        const content = JSON.stringify(products, null,"\t");
        await fs.writeFile(path, content, "utf - 8");
    }
    creoID(products) {
        let id;
        do {
            id = Math.floor(Math.random() * 100000);
        } while (products.find(p => p.id === id));
        return id;
    }
}
export default ProductManager;
