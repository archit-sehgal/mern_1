import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminSignup() {
  const [admin, setAdmin] = useState("");
  const [pass, setPass] = useState("");
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
              "http://localhost:3000/admin/signup",
              {
                adminname: admin,
                password: pass,
              }
            );
            let data = response.data;
            localStorage.setItem("token", data.token);
            window.location = "/";
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
export default AdminSignup;
