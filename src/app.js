const express = require("express")
const getProductManager = require("./productManager")
const getJSONProducts = require("./products.json")

const newProductManager = new ProductManager("./products.json");
const products = await newProductManager.getProducts();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
    res.send(products)
});


app.get("/products/:prodId", (req, res) => {
    const { prodId } = req.params
    const product = products.find((p) => p.id === parseInt(prodId))
    if (!product) {
        res.send("Producto no encontrado")
    } else {
        res.send(product)
    }
});


app.listen(8080, () =>{
    console.log("servidor escuchando desde el puerto 8080")
});