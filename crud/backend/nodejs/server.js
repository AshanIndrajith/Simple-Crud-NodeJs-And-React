const express =require('express')
const bodyparser = require('body-parser')
const cors=require('cors');
const mysql=require('mysql');
const server=express()
server.use(bodyparser.json());

server.use(cors());


const db=mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"dbsmschool",
});


db.connect(function(error){


    if(error){
        console.log("Error connection to DB");

    }
    else{
        console.log("successfully connection to DB");
    }
});



server.listen(8085,function check(error){

    if(error)
    {
        console.log("error...!!!!")
    }
    else
    {
        console.log("Started ...!")
    }
});



server.post("/api/student/add",(req,res)=>{

    let details={

        stname:req.body.stname,
        course:req.body.course,
        fee:req.body.fee,
    };

    let sql="INSERT INTO student SET ?";
    db.query(sql,details,(error)=>{
        if(error){
            res.send({ status : false, message: "student created failed"});
        }else{
            res.send({ status : true, message: "Student created sucessfully"});
        }
    });
});


server.get("/api/student",(req,res)=>{

    var sql="SELECT * FROM student";
    db.query(sql, function (error,result){
        if (error){
            console.log("error connecting to DB");
        }else{
            res.send({ status: true, data: result});
        }
    });
});


server.get("/api/student/:id",(req,res)=>{

    var studentid=req.params.id;
    var sql="SELECT * FROM student WHERE id="+studentid;
    db.query(sql, function (error, result){
        if (error){
            console.log("error connecting to DB");
        }else{
            res.send({ status: true, data: result});
        }

    });
});


server.put("/api/student/update/:id",(req,res)=>{
    let sql=
    "UPDATE student SET stname='"+
    req.body.stname +
    "',course='"+
    req.body.course +
    "',fee='"+
    req.body.fee +
    "' WHERE id=" +
    req.params.id;

    let query= db.query(sql, function (error, result){
        if (error){
            console.log("error connecting to DB");
        }else{
            res.send({ status: true, data: result});
        }

    });
});


server.delete("/api/student/delete/:id",(req,res)=>{

    let sql= "DELETE FROM student WHERE id="+req.params.id +"";
    let query= db.query(sql, function (error, result){
        if (error){
            console.log("error connecting to DB");
        }else{
            res.send({ status: true, data: result});
        }

    });
});