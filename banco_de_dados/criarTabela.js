const ModeloTabela = require('./ModeloTabela')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso!'))
    .catch(console.log)