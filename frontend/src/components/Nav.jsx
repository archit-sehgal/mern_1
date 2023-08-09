import React from 'react'
class NavComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='nav flex'>
                <div className="rightnav flex">
                    <button  onClick={()=>{
                        window.location="/"
                    }}  >React App</button>
                </div>
                <div className="leftnav flex">
                    <button onClick={()=>{
                        window.location="/"
                    }}>Home</button>
                    <button  onClick={()=>{
                        window.location="/courses"
                    }}  >Products</button>
                    <button  onClick={()=>{
                        window.location="/admin/Signup"
                    }}  >AdminSignup</button>
                    <button  onClick={()=>{
                        window.location="/admin/courses"
                    }}  >AddCourse</button>
                </div>
            </div>
        )
    }
}
export default NavComponent;