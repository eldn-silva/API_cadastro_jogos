const NaoEncontrado = require('../erros/NaoEncontrado')
const Modelo = require('./ModeloTabela')

module.exports = {
    listar() {
        return Modelo.findAll()
    },

    inserir(jogo) {
        return Modelo.create(jogo)
    },
    async buscaPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado

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