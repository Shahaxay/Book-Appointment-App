const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const userRoutes=require('./route/user');
const appointmentRoutes=require('./route/appointment');
const sequelize=require("./util/database");

const app=express();

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use(userRoutes);
app.use(appointmentRoutes);

sequelize.sync()
.then(result=>{
    // console.log(result);
    app.listen(3000,()=>console.log("listening..."));
})
.catch(err=>{
    console.log(err);
})
