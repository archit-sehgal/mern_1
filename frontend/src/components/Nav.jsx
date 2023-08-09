import React from 'react';
import { Link } from 'react-router-dom';

class NavComponent extends React.Component {
    render() {
        return (
            <div className='nav flex'>
                <div className="rightnav flex">
                    <button><Link to="/">React App</Link></button>
                </div>
                <div className="leftnav flex">
                    <button><Link to="/">Home</Link></button>
                    <button><Link to="/courses">Products</Link></button>
                    <button><Link to="/admin/Signup">AdminSignup</Link></button>
                    <button><Link to="/admin/courses">AddCourse</Link></button>
                </div>
            </div>
        );
    }
}

export default NavComponent;
