import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "./app.css";
import NavComponent from "./components/Nav";
import GetCourses from "./components/CoursesSection";
import AdminSignup from "./components/AdminSignup";
import AddCourses from "./components/AddCourses";
import UpdateCourse from "./components/UpdateCourse";
import Home from "./components/Home";

function App() {
  const [adminname, setAdminName] = useState(null);
  const init = async () => {
    await fetch("https://courseselling-emwv.onrender.com/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.adminname) {
          setAdminName(data.adminname);
        }
      });
      useEffect(()=>{
        init();
      })
  };

  return (
    <RecoilRoot>
      <Router>
        <div id="main" className="flex">
          <NavComponent adminname={adminname} setAdminName={setAdminName}/>
          <Routes>
          <Route path="/" element={<Home />}></Route>
            <Route path="/courses" element={<GetCourses />}></Route>
            <Route path="/admin/signup" element={<AdminSignup setAdminName={setAdminName} />}></Route>
            <Route path="/admin/courses" element={<AddCourses />}></Route>
            <Route
              path="/courses/:coursetitle"
              element={<UpdateCourse setAdminName={setAdminName}/>}
            ></Route>
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
