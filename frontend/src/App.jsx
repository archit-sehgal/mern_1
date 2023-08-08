import React, { useState, useEffect } from 'react'
import "./app.css"
import NavComponent from './components/Nav';
import GetCourses from './components/CoursesSection';

function App() {
  return (
    <div id='main' className='flex'>
      <NavComponent />
      <GetCourses />
    </div>
  )
}

export default App
