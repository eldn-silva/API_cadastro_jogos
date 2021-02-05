const Modelo = require('./ModeloTabela')

module.exports = {
    listar() {
        return Modelo.findAll()
    },

    inserir(jogo) {
        return Modelo.create(jogo)
    },
    async buscaPorId(id) {
        return await Modelo.findOne({
            where: {
                id: id
            }
        })
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(dadosParaAtualizar, {
            where: { id: id }
        })
    },
    remover(id) {
        return Modelo.destroy({
            where: { id:id }
        })
    }
}