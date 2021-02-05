const roteador = require('express').Router()
const { get } = require('config')
const AcoesTabela = require('../banco_de_dados/AcoesTabela')
const Jogo = require('../banco_de_dados/InsersaoDados')

roteador.get('/', async (req, res) => {
    const resultados = await AcoesTabela.listar()
    res.status(200)
    res.send(JSON.stringify(resultados))
})

roteador.post('/', async (req, res) => {
    try {
        if (!req.body.nome || !req.body.plataforma) {
            res.status(400)
            throw new Error('Campos inválidos. Verifique por favor!')
        }

        const mensagem = req.body
        const jogo = new Jogo(mensagem)
        await jogo.criar()
        res.status(201)
        res.send(JSON.stringify(jogo))

    } catch (erro) {
        res.send(JSON.stringify({ mensagem: erro.message }))
    }
})

roteador.get('/:idJogo', async (req, res) => {
    const id = req.params.idJogo
    const jogo = new Jogo({ id: id })
    await jogo.carregar()
    res.status(200)
    res.send(JSON.stringify(jogo))
})

roteador.put('/:idJogo', async (req, res) => {
    const id = req.params.idJogo
    const dadosRecebidos = req.body
    const dados = Object.assign({}, dadosRecebidos, { id: id })
    const jogo = new Jogo(dados)
    await jogo.atualizar()
    res.status(204)
    res.end()
})

roteador.delete('/:idJogo', async (req, res) => {
    const id = req.params.idJogo
    const jogo = new Jogo({ id:id })
    await jogo.carregar()
    await jogo.remover()
    res.status(204)
    res.end()
})

module.exports = roteador