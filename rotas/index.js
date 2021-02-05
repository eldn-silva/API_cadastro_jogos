const roteador = require('express').Router()
const { get } = require('config')
const AcoesTabela = require('../banco_de_dados/AcoesTabela')
const Jogo = require('../banco_de_dados/InsersaoDados')

roteador.get('/', async (req, res) => {
    const resultados = await AcoesTabela.listar()
    res.status(200)
    res.send(JSON.stringify(resultados))
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const mensagem = req.body
        const jogo = new Jogo(mensagem)
        await jogo.criar()
        res.status(201)
        res.send(JSON.stringify(jogo))

    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idJogo', async (req, res, proximo) => {
    try{
        const id = req.params.idJogo
        const jogo = new Jogo({ id: id })
        await jogo.carregar()
        res.status(200)
        res.send(JSON.stringify(jogo))
    } catch(erro) {
        proximo(erro)
    }
})

roteador.put('/:idJogo', async (req, res, proximo) => {
    try {
        const id = req.params.idJogo
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const jogo = new Jogo(dados)
        await jogo.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idJogo', async (req, res, proximo) => {
    try {
        const id = req.params.idJogo
        const jogo = new Jogo({ id:id })
        await jogo.carregar()
        await jogo.remover()
        res.status(204)
        res.end()
    } catch(erro) {
        proximo(erro)
    }
})

module.exports = roteador