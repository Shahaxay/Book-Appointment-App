var form=document.getElementById("detail");
        form.addEventListener("submit",store);
        var dest=document.getElementById("dest");
        dest.addEventListener("click",deleteItems);

        //displaying the appointment list stored from localstorage
        window.addEventListener("DOMContentLoaded",()=>{
            //fetching data from crudcrud server
            axios.get("http://localhost:3000/getAppointments")
            .then((res)=>{
                res.data.forEach((obj)=>{
                    display(obj);
                })
            })
            .catch((err)=>console.log(err));
        });
        function display(obj){
            //forming text to show in output
            console.log(obj._id);
            var text=obj.name+" - "+obj.email_id+" - "+obj.phone;
            //creating li element
            var newEle=document.createElement("li");
            newEle.appendChild(document.createTextNode(text));
            //creating delete button 
            var newEle1=document.createElement("button");
            //adding classname to detect the respective details
            newEle1.className="delete";
            newEle1.setAttribute("data-id",obj.id);
            newEle1.appendChild(document.createTextNode("delete"));
            newEle.appendChild(newEle1);
            //creating edit button
            var newEle2=document.createElement("button");
            newEle2.className="edit";
            newEle2.appendChild(document.createTextNode("Edit"));
            newEle.append(newEle2);
            dest.appendChild(newEle);
            console.log(newEle.firstChild);
        }
        function store(e){
            e.preventDefault();
            var user={
                name:document.getElementById("name").value,
                email_id:document.getElementById("email").value,
                phone:document.getElementById("phone").value
            };
            //storing in mysql db 
            axios.post("http://localhost:3000/user/add-appointment",user)
            .then(res=>{
                //console.log(res.data._id);
                user.id=res.data._id;
                form.reset();
                display(user);

            })
            .catch(err=>{
                console.log(err);
                document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong</h4>";
            });
        }
        //deleting items from local storage as well as from destination
        function deleteItems(e){
            e.preventDefault();
            if(e.target.classList.contains("delete")){
                var key=e.target.dataset.id;
                console.log("key:",key);
                axios.delete("http://localhost:3000/user/delete-appointment/"+key)
                .then(result=>{
                    console.log("deleted");
                    e.target.parentElement.remove();
                })
                .catch(err=>console.log(err));
            }else if(e.target.classList.contains("edit")){
                var key=e.target.previousElementSibling.dataset.id;
                console.log("edit:",key);
                //get req
                axios.get("http://localhost:3000/user/edit-appointment/"+key)
                .then(res=>{
                    document.getElementById("name").value=res.data.name;
                    document.getElementById("email").value=res.data.email_id;
                    document.getElementById("phone").value=res.data.phone;
                    //delete req
                    return axios.delete("http://localhost:3000/user/delete-appointment/"+key);
                })
                .then(res=>{
                    console.log(res);
                    console.log("deleted for editing");
                    e.target.parentElement.remove();
                })
                .catch(err=>console.log(err));
            }
        }