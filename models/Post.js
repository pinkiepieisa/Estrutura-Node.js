//Arquivo para a criação das tabelas do banco

const db = require('./db');
//Ligação com o arquivo do banco

//Criando a tabela postagens
const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING // Tipo de dado
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

Post.sync({force:false}); //Sincroniza com o banco de dados
//False após a primeira execução para não duplicar a tabela

module.exports = Post;
//Exporta a variável para ser usado em outros arquivos