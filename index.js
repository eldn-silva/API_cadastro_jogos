const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Jogo = require('./banco_de_dados/InsersaoDados')
const roteador = require('./rotas/index')
const NaoEncontrado = require('./erros/NaoEncontrado')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const CampoInvalido = require('./erros/CampoInvalido')

app.use(bodyParser.json())

app.use('/api/jogos', roteador)

app.use((erro, req, res, proximo) => { //Para retornar os erros em formato de JSON
    let status = 500

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

const port = 3000

app.listen(port, () => console.log(`API está funcionando. Porta: ${port}...`))