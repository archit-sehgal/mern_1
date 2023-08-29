import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function NavComponent({adminname,setAdminName}) {
  const navigate=useNavigate();
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
              setAdminName(null)
              navigate("/")
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
