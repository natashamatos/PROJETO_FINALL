//npm init//
//npm i express//


const express = require("express")
const app = express()
const port = 3000
app.use(express.json())


//npm i bcrypt//
const bcrypt = require("bcrypt")

const db = require("./db")

app.post("/cliente", async (req, res ) => {
    try {
        const cliente = req.body
        const senhaCRIPT = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCRIPT
        
        const resultado = await db.pool.query(
            `INSERT INTO CLIENTE (
                NOME, CPF, EMAIL, CELULAR, SENHA
             ) VALUES (?,   ?,   ?,   ?,  ?)`, 
             [cliente.nome, cliente.cpf, cliente.email,
              cliente.celular,cliente.senha]


        )
        res.status(201). json({
            mensagem : "Cliente cadastrado ID: " + resultado[0].insertId
        })

    }catch (error) {
        res.status (500).json({erro: error.message})
    }
})


app.get("/cliente", async (req, res ) => {
    try {
        const resultado = await db.pool.query(
            `SELECT ID, NOME, CPF, EMAIL, CELULAR FROM CLIENTE`
        )
        res.status(200).json(resultado[0])

    }catch (error) {
        res.status (500).json({erro: error.message})
    }
})


app.get("/cliente/:id", async (req, res ) => {
    try {
        const id = req.params.id

        const resultado = await db.pool.query(
            `SELECT ID, NOME, CPF, EMAIL, CELULAR FROM CLIENTE WHERE ID = ?`,
            [id]
        )
        res.status(200).json(resultado[0])

    }catch (error) {
        res.status (500).json({erro: error.message})
    }
})


app.patch("/cliente/:id", async (req, res ) => {
    try {
        const id = req.params.id
        const cliente = req.body
        const senhaCRIPT = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCRIPT

        const resultado = await db.pool.query(
            `UPDATE CLIENTE SET
                NOME = ?, CPF = ?, EMAIL = ?, CELULAR = ?, SENHA = ?
             WHERE ID = ?`,
             [cliente.nome, cliente.cpf, cliente.email,
              cliente.celular, cliente.senha, id]
        )
        res.status(200).json({
            mensagem : "Cliente atualizado"
        })

    }catch (error) {
        res.status (500).json({erro: error.message})
    }
})


app.delete("/cliente/:id", async (req, res ) => {
    try {
        const id = req.params.id

        const resultado = await db.pool.query(
            `DELETE FROM CLIENTE WHERE ID = ?`,
            [id]
        )
        res.status(200).json({
            mensagem : "Cliente excluído"
        })

    }catch (error) {
        res.status (500).json({erro: error.message})
    }
})


app.listen(port, () =>{
    console.log("Api rodando porta:" + port )
})
