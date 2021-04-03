module.exports = function(Sequelize, DataTypes){
    
    var Users = Sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        name: DataTypes.STRING(50),
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        local: DataTypes.STRING(100),
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        bio: DataTypes.STRING(600),
        avatar: DataTypes.STRING(100)
    })

    Users.associate = function(models) {
        Users.hasMany(models.Repositories, {
            as: 'Repositories',
            foreign_key: 'user_id'
        })
        Users.belongsToMany(Users, {
            as: 'Following',
            through: 'Follows'
        } )
        Users.belongsToMany(models.Repositories, {
            as: 'StarredReps',
            through: 'Stars',
        })
        Users.belongsTo(models.Token)
    }

    return Users;
}