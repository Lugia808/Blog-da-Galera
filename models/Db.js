const Sequelize = require('sequelize');

const sequelize = new Sequelize('postsbg', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

/*sequelize.authenticate().then(function(){
    console.log('conexão bem sucedida')
})*/

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}

