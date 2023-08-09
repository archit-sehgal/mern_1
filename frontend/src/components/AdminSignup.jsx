import { useState } from "react"

function AdminSignup() {
    const [admin, setAdmin] = useState("")
    const [pass, setPass] = useState("")
    return (
        <div>
            <div className="Signup_form flex">
                AdminId-<input onChange={(e) => {
                    setAdmin(e.target.value)
                }} type="text" />

                AdminPassword-<input onChange={(e) => {
                    setPass(e.target.value)
                }} type="password" />
                <button onClick={()=>{
                            fetch("http://localhost:3000/admin/signup",{
                                method:"POST",
                                body:JSON.stringify({
                                    adminname:admin,
                                    password:pass
                                }),
                                headers:{
                                    "content-type":"application/json"
                                }
                            })
                            .then((response)=>{
                                response.json().then((data)=>{
                                    console.log(data)
                                    localStorage.setItem("token",data.token)
                                })
                            })

                        }}>Signup</button>
            </div>
        </div>
    )
}
export default AdminSignup