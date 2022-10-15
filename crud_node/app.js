const { response } = require("express");
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs")
const { request } = require("http");


const app = express();
app.use(express.json())

let products = [];
fs.readFile("products.json", "utf-8",(err, data)=>{
    if(err){
        console.log(err);
    }else{
        products = JSON.parse(data)
    }
})

/**
 * POST = > inserir dados
 * GET => buscar dados
 * PUT => alterar um dado
 * DELETE => remover um dado
 */
/**
 * REQUEST => É o pedido que o cliente (navegador) realiza para um servidor.
 *
 * 
 * 
 *  RESPONSE => E o response vem da palavra resposta.

 

Depois que o client envia o request, o servidor recebe e o processa. O resultado deste processamento é enviado como resposta.
 */

/**
 * body => sempre que quiser enviar dados para a minha aplicação
 * params => aquilo que vem na URL, pode ser chamado de parametros de rota /products/982378937
 *  Query => /products?id=093283902823908&value127678623786
 * */


app.post("/products", (request, response) => {
    const { name, price } = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };
    products.push(product);
    

    createProductsFile();

    return response.json(product)
});

app.get("/products", (request, response) => {

    return response.json(products)
})

app.get("/products/:id", (request, response) => {
    const { id } = request.params;

    const product = products.find((product) => product.id === id);

    return response.json(product);
})

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body
    const productIndex = products.findIndex((product) => product.id === id)
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }
    createProductsFile();

    return response.json({ message: "produto alterado com sucesso" })
})

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);
    createProductsFile()

    return response.json({ message: "produto removido com sucesso" })
})

function createProductsFile(){
    fs.writeFile("products.json",JSON.stringify(products),(err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("produto inserido");
        }
    })
}
app.listen(4002, () => console.log("servidor comn express rodando"));

