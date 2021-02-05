const sequelize = require('sequelize')
const dadosBanco = require('./index')

const colunas = {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    plataforma: {
        type: sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'jogos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = dadosBanco.define('jogos', colunas, opcoes)