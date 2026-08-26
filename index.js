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
            `INSERT INTO Cliente (
                senha, celular, cpf, email, nome
             ) VALUES (?,   ?,   ?,   ?,  ?)`, 
             [cliente.senha, cliente.celular, cliente.cpf,
              cliente.email,cliente.nome]


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
            `SELECT ID, nome, cpf, email, celular FROM Cliente`
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
            `SELECT ID, nome, cpf, email, celular FROM Cliente WHERE ID = ?`,
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
            `UPDATE Cliente SET
                senha = ?, celular = ?, cpf = ?, email = ?, nome = ?
             WHERE ID = ?`,
             [cliente.senha, cliente.celular, cliente.cpf,
              cliente.email, cliente.nome, id]
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
            `DELETE FROM Cliente WHERE ID = ?`,
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
