import { Router } from "express"; 
import ProductManager from "../utils.js"

const productManager = new ProductManager( "../products.json");
const router = Router()

router.get('/products', async (req, res) => {
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
router.get("/products/:prodId", async (req, res) => {
    const products = await productManager.getProducts();
    const { prodId } = req.params
    const product = products.find((p) => p.id === parseInt(prodId))
    if (!product) {
        res.status(201).json({ error: "Producto no encontrado" })
    } else {
        res.send({ product })
    }
});
router.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});
router.put("/products/:pid",async(req,res)=>{
    try {
        const { pid } = req.params
        const updateProduct = req.body
        await productManager.updateProduct(pid,updateProduct);
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
})
router.delete("/products/:pid",async(req,res)=>{
    try {
        const { pid } = req.params
        await productManager.deleteProduct(pid)
        res.status(201).json({ message: 'Producto borrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar el producto' });
    }
})

export default router;