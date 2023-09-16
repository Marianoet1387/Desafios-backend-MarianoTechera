class ProductManager {

    constructor() {
        this.Products = [];
    }
    getProdcuts() {
        return this.Products
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        this.Products.push(
            {
                id: this.Products.length + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            })
        console.log("Prodcut added")
    }
    getProdcutById(id) {
        let product = this.Products.find(prod => prod.id === id)
        if (!product) {
            console.log("Product not found")
        }
    }

    }
    let productManager = new ProductManager();

console.log(productManager.getProdcuts());

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25)
console.log(productManager.getProdcuts());

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25)

productManager.getProdcutById();

console.log(productManager.getProdcuts());
