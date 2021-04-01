module.exports = function(Sequelize, DataTypes){
    const Token = Sequelize.define("Token", {
        user_id: DataTypes.INTEGER
    })

    Token.associate = function(models) {
        Token.hasMany(models.Users, { as: 'Users', foreign_key: 'user_id' })
    }

    return Token
}