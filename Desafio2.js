const { promises: fs } = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    
    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios.');
        }
        // falta condicional para que no se repita.
        const products = await getJSONFromFile(this.path);
        const id = this.creoID()
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        products.push(newProduct);
        await saveJSONToFile(this.path, products);
    }

    creoID = () => parseInt(Math.random() * 100000)
    
    getProdcuts() {
        return getJSONFromFile(this.path);
    }
    
    getProdcutById(id) { 
        //  error Cannot read properties of undefined (reading 'find') 
        let product = this.products.find(p => p.id === id)
        if (!product) {
            console.log("Product not found")
        } else {
            console.log("product found", product)
        }
    }

    deleteProduct = async ()=> {
        try {
            console.log('Intentando borrar el archivo...')
            await fs.unlink('./products.json') 
            console.log('Finalizó el borrado del archivo.')
        } catch (error) {
            console.log('No se pudo  borrar el archivo.')
        }      
    }   
    updateProduct = async (id)=> {
        const updateProduct = {title, description, price, thumbnail, code, stock };
        console.log('🚀 Iniciando la actualizacion...')
        await fs.promises.writeFile('./text-output-file.txt',updateProduct , 'utf-8')
        console.log('😎 Finalizó la actualizacion')
    }

}
const getJSONFromFile = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        return [];
    }
    const content = await fs.readFile(path, 'utf-8');
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
}


const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t'); 
    try {
        await fs.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser escrito.`);
    }
}  

const desafio = async () => {
    try {
      const productManager = new ProductManager("./products.json");
      await productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "sin imagen",
        code: "abc123",
        stock: 25
      });
      const products = await productManager.getProdcuts();
      console.log('😎 Acá los productos:', products);
      //productManager.getProdcutById(1)
      //productManager.deleteProduct()
    } catch (error) {
      console.error('😱 Ha ocurrido un error', error.message);
    }
  };
  desafio()
  