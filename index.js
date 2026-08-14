//npm init
//npm i express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

//npm i mysql2
const db = require ("./db")

//npm i bcrypt
const bcrypt = require("bcrypt")

app.post("/Cliente", async (req, res) => {
    try{
        const cliente = req.body
        const senhaCript = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCript

        //envio para o BD
        const resultado = await db.pool.query(
            `INSERT INTO Cliente (
                senha, celular, cpf, email, nome
            ) VALUES (
                ?, ?, ?, ?, ?
            )`,
            [cliente.senha, cliente.celular, cliente.cpf,
             cliente.email, cliente.nome]
        )
        res.status(201).json({mensagem: "Cliente cadastrado com sucesso. ID = " + resultado[0].insertId
    })
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})



app.listen(port,() => {
    console.log("API rodando na porta " + port)
})