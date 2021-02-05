class NaoEncontrado extends Error {
    constructor() {
        const mensagem = 'Jogo não foi encontrado'
        super(mensagem)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado