const Sequelize = require("sequelize");

const Token = sequelize.define("Token", {
    user_id: Sequelize.INTEGER
})

Token.associate = function(models) {
    Token.hasMany(Users, { as: 'Users', foreign_key: 'user_id' })
}



module.exports = Token;