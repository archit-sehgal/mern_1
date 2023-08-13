import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UpdateCourse from './UpdateCourse';
function GetCourses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
            
        setInterval(() => {
            axios.get('http://localhost:3000/')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
        }, 1000);
    }, []);
    const courseNumber = courses.length;
    return (<>
        <div className="coursesectionhead flex">
            <h2>We offer more than {courseNumber-1} courses in a variety of fields</h2>
        </div>
        <div id='CourseSection' className='flex'>
            {courses.map(course => (
                <div className='SingleCourse flex'>
                    <h1>{course.title}</h1>
                    <p>{course.desc}</p>
                    <span>{course.price}/-</span>
                </div>
            ))}
        </div>
        </>)
}
export default GetCourses;