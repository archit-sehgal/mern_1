import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
function AdminSignup({setAdminName}) {
  const [admin, setAdmin] = useState("");
  const [pass, setPass] = useState("");
  const navigate=useNavigate();
  return (
    <div  className="AddcourseMain flex">
      <div className="addcoursehead flex">
        <h1>Admin Signup</h1>
      </div>
      <div className="Signup_form flex">
        AdminId-
        <input
          onChange={(e) => {
            setAdmin(e.target.value);
          }}
          type="text"
        />
        AdminPassword-
        <input
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
        />
        <button
          onClick={async () => {
            const response = await axios.post(
              "https://courseselling-emwv.onrender.com/admin/signup",
              {
                adminname: admin,
                password: pass,
              }
            );
            let data = response.data;
            localStorage.setItem("token", data.token);
            setAdminName(admin)
            navigate("/")
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
export default AdminSignup;
