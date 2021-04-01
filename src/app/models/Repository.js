module.exports = function(Sequelize, DataTypes){
    var Repositories = Sequelize.define("Repositories", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        name: DataTypes.STRING(50),
        local: DataTypes.STRING(100),
        description: DataTypes.STRING(600),
        slug: DataTypes.STRING(100),
        user_id: DataTypes.INTEGER(11)
        

    })

    Repositories.associate = function(models) {
        Repositories.belongsToMany(models.Users, { 
            as: 'StarringUsers',
            through: 'Stars',
        })
        Repositories.belongsTo(models.Users)
    }

    return Repositories
}