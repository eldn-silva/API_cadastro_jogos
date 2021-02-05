const CampoInvalido = require('../erros/CampoInvalido')
const DadosNaoFornecidos = require('../erros/DadosNaoFornecidos')
const acoesTabela = require('./AcoesTabela')

class Jogo {
    constructor({ id, nome, plataforma, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.nome = nome
        this.plataforma = plataforma
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        this.validar()
        const resultado = await acoesTabela.inserir({
            nome: this.nome,
            plataforma: this.plataforma
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await acoesTabela.buscaPorId(this.id)
        this.nome = encontrado.nome
        this.plataforma = encontrado.plataforma
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar() {
        this.validar()
        await acoesTabela.buscaPorId(this.id) // No método buscaPorId já é tratado o caso de id's inexistentes
        const campos = ['nome', 'plataforma']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            } else if (typeof valor !== 'string'){
                throw new CampoInvalido(campo)
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await acoesTabela.atualizar(this.id, dadosParaAtualizar)
    }

    remover() {
        return acoesTabela.remover(this.id)
    }

    validar() {
        const campos = ['nome', 'plataforma']

        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length == 0) {
                throw new CampoInvalido(campo)
            }
        })
    }

}

module.exports = Jogo