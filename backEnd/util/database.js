const {Sequelize}=require('sequelize');
const sequelize=new Sequelize('node-complete','root','sweetualsubaby',{dialect:'mysql',host:'localhost'});
module.exports=sequelize;
