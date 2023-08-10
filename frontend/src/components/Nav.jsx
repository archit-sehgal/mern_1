import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavComponent() {
  const [adminname, setAdminName] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.adminname) {
          console.log(data.adminname);
          setAdminName(data.adminname);
        }
      });
  }, []);

  if (adminname) {
    return (
      <div className="nav flex">
        <div className="rightnav flex">
          <button>
            <Link to="/">React App</Link>
          </button>
        </div>
        <div className="leftnav flex">
          <div>{adminname}</div>
          <button
            onClick={() => {
              localStorage.setItem("token", null);
              window.location = "/";
            }}
          >
            logout
          </button>
          <button>
            <Link to="/courses">Courses</Link>
          </button>
          <button>
            <Link to="/admin/courses">AddCourse</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="nav flex">
      <div className="rightnav flex">
        <button>
          <Link to="/">React App</Link>
        </button>
      </div>
      <div className="leftnav flex">
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/courses">Courses</Link>
        </button>
        <button>
          <Link to="/admin/Signup">AdminSignup</Link>
        </button>
      </div>
    </div>
  );
}

export default NavComponent;
