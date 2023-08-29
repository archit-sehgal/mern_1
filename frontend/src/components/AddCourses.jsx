import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
function AddCourses() {
    const  navigate=useNavigate();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    return (
        <div className="AddcourseMain flex">
            <div className="addcoursehead flex">
                <h1>Add Course</h1>
            </div>
            <div className="Signup_form flex">
                Title-<input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" />

                Description-<input onChange={(e) => {
                    setDesc(e.target.value)
                }} type="text" />

                Price-<input onChange={(e) => {
                    setPrice(e.target.value)
                }} type="text" />
                <button onClick={()=>{
                    fetch("http://localhost:3000/admin/courses",{
                        method:"POST",
                        body:JSON.stringify({
                            title:title,
                            desc:desc,
                            price:price
                        }),
                        headers:{
                            "content-type":"application/json",
                            "authorization":"bearer "+localStorage.getItem("token")
                        }
                    })
                    .then((res)=>{
                        res.json().then((data)=>{
                            console.log(data)
                            navigate("/courses")
                        })
                    })
                }}>Add Course</button>
            </div>
        </div>
    )
}
export default AddCourses