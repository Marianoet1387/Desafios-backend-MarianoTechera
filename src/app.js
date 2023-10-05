const express = require('express');
const ProductManager = require("./productManager")
const productManager = new ProductManager("./products.json");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const { limit } = req.query
        const isLimit = limit && (limit <= 5)
        if (isLimit) {
            prod = products.slice(6)
            res.status(201).json({ prod })
        } else {
            res.status(201).json({ products })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});
app.get("/products/:prodId", async (req, res) => {
    const products = await productManager.getProducts();
    const { prodId } = req.params
    const product = products.find((p) => p.id === parseInt(prodId))
    if (!product) {
        res.status(201).json({ error: "Producto no encontrado" })
    } else {
        res.send({ product })
    }
});
app.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

app.listen(8080, () => {
    console.log("servidor escuchando desde el puerto 8080 http://localhost:8080/products")
});