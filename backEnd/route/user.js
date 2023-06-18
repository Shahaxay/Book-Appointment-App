const express=require('express');

const userController=require('../controller/user');

const route=express.Router();

route.post('/user/add-appointment',userController.postAppointments);
route.delete('/user/delete-appointment/:appointmentId',userController.postDeleteAppointment);
route.get('/user/edit-appointment/:appointmentId',userController.getEditAppointment);

module.exports=route;