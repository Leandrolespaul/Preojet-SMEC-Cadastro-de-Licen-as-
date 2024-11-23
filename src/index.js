import express from 'express'
import cors from 'cors'


const app = express()
const port = 3002
app.use(express.json())
app.use(cors())

const funcionarios = []

let cont = 1
const id = () => cont++

const cadastroFuncionarios = (nome, dataNascimento, telefone, cpf, cidade, estado, logradouro, bairro, numero, matricula, admissaoMatricula, email) => {
    funcionarios.push({id: id(), nome, dataNascimento, telefone, cpf, cidade, estado, logradouro, bairro, numero, matricula, admissaoMatricula, email})
}


app.get('/funcionarios', (req, res) => {
    res.send(funcionarios)
})

app.post('/funcionarios', (req, res) => {
    cadastroFuncionarios(req.body.nome, req.body.dataNascimento, req.body.telefone, req.body.cpf, req.body.cidade, req.body.estado, req.body.logradouro, req.body.bairro, req.body.numero, req.body.matricula, req.body.admissaoMatricula, req.body.email)
    res.send('Funcionario cadastrado com sucesso!')
})

app.put('/funcionarios/:id', (req, res) => {
    const encontrarFuncionario = funcionarios.find(funcionario => funcionario.id === parseInt(req.params.id))
    if(encontrarFuncionario) encontrarFuncionario.nome = req.body.nome
    if(encontrarFuncionario) encontrarFuncionario.dataNascimento = req.body.dataNascimento
    if(encontrarFuncionario) encontrarFuncionario.telefone = req.body.telefone
    if(encontrarFuncionario) encontrarFuncionario.cpf = req.body.cpf
    if(encontrarFuncionario) encontrarFuncionario.cidade = req.body.cidade
    if(encontrarFuncionario) encontrarFuncionario.estado = req.body.estado
    if(encontrarFuncionario) encontrarFuncionario.logradouro = req.body.logradouro
    if(encontrarFuncionario) encontrarFuncionario.bairro = req.body.bairro
    if(encontrarFuncionario) encontrarFuncionario.numero = req.body.numero
    if(encontrarFuncionario) encontrarFuncionario.matricula = req.body.matricula
    if(encontrarFuncionario) encontrarFuncionario.admissaoMatricula = req.body.admissaoMatricula
    if(encontrarFuncionario) encontrarFuncionario.email = req.body.email


    res.send("Funcionário alterado com sucesso!")
});

// delete do array original
app.delete("/funcionarios/:id", (req, res) => {
    const index = funcionarios.findIndex(funcionario => funcionario.id === parseInt(req.params.id))
    funcionarios.splice(index, 1)
    res.send("Funcionário deletado com sucesso!")
});


app.listen(port, () => {
    console.log('Servidor Funcionando')
})




