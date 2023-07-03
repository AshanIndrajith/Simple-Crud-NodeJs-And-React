import axios from 'axios';
import {useEffect, useState } from "react";

function Student()
{
  const [id, setId] = useState('');
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");


  const [students, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);

  
  
  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8085/api/student");
         setUsers(result.data.data);
         console.log(result.data);
  }
 
    
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8085/api/student/add",
        {
        
          stname: stname,
          course: course,
          fee: fee
        
        });
          alert("Student Registation Successfully");
         
         
          Load();
        
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }
   async function editStudent(students)
   {
    setName(students.stname);
    setCourse(students.course);
    setFee(students.fee); 
 
    setId(students.id);
    
   }



   async function DeleteStudent(id)
   {
       
        await axios.delete("http://localhost:8085/api/student/delete/" + id); 
        alert("Student deleted Successfully");
        Load();
   
   }



   async function update(event)
   {
    event.preventDefault();

   try
       {
        
        await axios.put("http://localhost:8085/api/student/update/"+ students.find(u => u.id === id).id || id,
       {
         id: id,
         stname: stname,
         course: course,
         fee: fee
       
       });
         alert("Registation Updateddddd");
      
       
       }
   catch(err)
       {
         alert(" Registation Failed");
       }
  }



  return (
    <div className="d-flex justify-content-center align-items-center">
      
       <div class="container mt-4" >
       <h1> Student Details</h1><br></br>
          <form>
              <div class="form-group">
               <input  type="text" class="form-control" id="student_id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
               
               />
                <label>Student Name</label>
                <input  type="text" class="form-control" id="name"
                value={stname}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>Course</label>
                <input  type="text" class="form-control" id="course" 
                 value={course}
                  onChange={(event) =>
                    {
                      setCourse(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Fee</label>
                <input type="text" class="form-control" id="fee" 
                  value={fee}
                onChange={(event) =>
                  {
                    setFee(event.target.value);      
                  }}
                />
              </div>

                 <div>
              <button   class="btn btn-success mt-4"  onClick={save}>Register</button> <span> </span>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div><br></br><br></br>

          <table class="table mx-auto" border='1'>
  <thead>
    <tr>
      <th scope="col">Student Id</th>
      <th scope="col">Student Name</th>
      <th scope="col">Course</th>
      <th scope="col">Fee</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {students.map(function fn(student)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{student.id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>
                <td>{student.fee}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>   <span> </span>
                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
 
export default Student;