const Sequelize = require("sequelize");

const Users = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    name: Sequelize.STRING(50),
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    local: Sequelize.STRING(100),
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    bio: Sequelize.STRING(600),
    avatar: Sequelize.STRING(100)
})

Users.associate = function(models) {
    Users.hasMany(Repositories, { as: 'Repositories', foreign_key: 'repo_id'})
    Users.belongsToMany(models.Users, { as: 'Followers', through: models.UsersFollower})
    Users.belongsToMany(models.Users, { as: 'Following', through: models.UsersFollowing})
    Users.belongsToMany(models.Repository, { as: 'Stars', through: models.Stars})
    Users.belongTo(models.Token)
}


module.exports = Users;