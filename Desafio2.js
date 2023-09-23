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
        const products = await getJSONFromFile(this.path);
        if (products.some((p) => p.code === code)) {
            console.log(`Ya se encuetra agregado el code: ${code}`)
        } else {
            const id = this.creoID()
            const newProduct = { id, title, description, price, thumbnail, code, stock };
            products.push(newProduct);
            await saveJSONToFile(this.path, products);
        }
    }

    creoID = () => parseInt(Math.random() * 100000)
    
    getProducts = () =>  getJSONFromFile(this.path)
    
    deleteProductsFile = () =>  deleteToFile(this.path)

    async deleteProduct(id){
        const products = await getJSONFromFile(this.path);
        let index = products.findIndex((producto) => producto.id === id)
        if (index  > -1 ){
            products.splice(index, 1)
            await saveJSONToFile(this.path, products);
            console.log("se ha borrado correctamente el producto ")
        } 
        return products
    }

    async getProdcutById(id) { 
        const products = await getJSONFromFile(this.path);
        let productById = products.find(p => p.id === id)
        if (!productById) {
            console.log("Product not found")
        } else {
            console.log("Product found", productById)
        }
    }

    async updateProduct(id) {
      const products = await getJSONFromFile(this.path);
      let updateProd = products.find(p => p.id === id)
      if (!updateProd) {
        console.log("Product not found")
    } else {
        console.log("update Product", updateProd)
      
    }
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

const updateToFile = async () => {
    try {
        updateProduct =  { 
         title : "nuevo title", description, price, thumbnail, code, stock };
        console.log('🚀 Iniciando la actualizacion...')
        await fs.appendFile('./products.json', updateProduct, 'utf-8')
        console.log('😎 Finalizó la actualizacion')
    } catch (error) {
        throw new Error(`El archivo  no pudo ser actualizar.`);
    }

}

const deleteToFile = async (path)=> {
    try {
        console.log('Intentando borrar el archivo...')
        await fs.unlink('./products.json') 
        console.log('Finalizó el borrado del archivo.')
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser borrado.`);
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

      const products = await productManager.getProducts();
      console.log("getProdcuts",'Acá los productos:', products);
      productManager.getProdcutById(10955)
      //productManager.deleteProduct(10955) 
     // productManager.updateProduct(10955)
      //productManager.deleteProductsFile()
    } catch (error) {
      console.error(' Ha ocurrido un error: ', error.message);
    }
  };
  desafio()
  