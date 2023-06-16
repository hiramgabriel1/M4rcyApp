import {  DataTypes, Model } from "sequelize" // importamos el modelo de sequelize
import sequelize from '../db/conex.js' // importamos la conexión a la base de datos

class User extends Model { } // creamos la clase User que extiende de Model

//iniciamos ese modelo

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    socialNetworks:{
        type: DataTypes.JSON,
        defaultValue:{},
    }
},
    {
        sequelize,
        modelName:
            "User"
    }
)

export default User