const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const user=sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    } ,
    email_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone: {
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports=user;