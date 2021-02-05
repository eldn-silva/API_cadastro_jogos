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
        await acoesTabela.buscaPorId(this.id)
        const campos = ['nome', 'plataforma']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        await acoesTabela.atualizar(this.id, dadosParaAtualizar)
    }

    remover() {
        return acoesTabela.remover(this.id)
    }

}

module.exports = Jogo