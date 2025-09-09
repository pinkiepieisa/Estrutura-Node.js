const Sequelize = require('sequelize');
//Conexão com o banco de dados

const sequelize = new Sequelize('postapp', 'root', 'root', {
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
});

//Exportação das variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};

//Arquivo para criar a ligação com o banco de dados