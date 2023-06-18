const users=require('../model/user');

exports.getAppointments=(req,res,next)=>{
    console.log("requesting");
    users.findAll()
    .then(appointments=>{
        res.json(appointments);
    })
    .then(err=>console.log(err));
}