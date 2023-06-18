const express=require('express');

const appointmentController=require('../controller/appointment');

const route=express.Router();

route.get('/getAppointments',appointmentController.getAppointments);

module.exports=route;