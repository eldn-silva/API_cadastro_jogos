const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Jogo = require('./banco_de_dados/InsersaoDados')
const roteador = require('./rotas/index')

app.use(bodyParser.json())

app.use('/api/jogos', roteador)


const port = 3000

app.listen(port, () => console.log(`API está funcionando. Porta: ${port}...`))
