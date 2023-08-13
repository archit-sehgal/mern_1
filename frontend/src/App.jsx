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

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div id="main" className="flex">
          <NavComponent />
          <Routes>
            <Route path="/courses" element={<GetCourses />}></Route>
            <Route path="/admin/signup" element={<AdminSignup />}></Route>
            <Route path="/admin/courses" element={<AddCourses />}></Route>
            <Route
              path="/courses/:coursetitle"
              element={<UpdateCourse />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
