const users=require("../model/user");
const { use } = require("../route/user");

exports.postAppointments=(req,res,next)=>{
    //store appointment details in user table
    users.create({
        name:req.body.name,
        email_id:req.body.email_id,
        phone:req.body.phone
    }).then(result=>{
        const response={_id:result.id};
        // console.log(result);
        console.log("created");
        res.json(response);
    }).catch(err=>console.log(err));
    
}

exports.postDeleteAppointment=(req,res,next)=>{
    const appointmentId=req.params.appointmentId;
    users.findByPk(appointmentId)
    .then(appointment=>{
        return appointment.destroy();
    })
    .then(result=>{
        console.log("deleted");
        res.json({status:"success"});
    })
    .catch(err=>console.log(err));
}

exports.getEditAppointment=(req,res,next)=>{
    const appointmentId=req.params.appointmentId;
    users.findByPk(appointmentId)
    .then(appointment=>{
        res.json(appointment);
    })
    .catch(err=>console.log(err));
}
