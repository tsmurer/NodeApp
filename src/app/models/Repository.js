const Sequelize = require("sequelize");

const Repository = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    name: Sequelize.STRING(50),
    local: Sequelize.STRING(100),
    description: Sequelize.STRING(600),
    slug: Sequelize.STRING(100)
})

Repository.associate = function(models) {
    Users.hasMany(Repositories, { as: 'Repositories', foreign_key: 'repo_id'})
    Repository.belongsToMany(models.Users, { as: 'Stars', through: models.Stars})
    Repository.belongTo(models.Users)
}


module.exports = Repository;