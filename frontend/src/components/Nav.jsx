import React from 'react'
class NavComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='nav flex'>
                <div className="rightnav flex">
                    <a href="">React App</a>
                </div>
                <div className="leftnav flex">
                    <a href="">Home</a>
                    <a href="">Products</a>
                    <a href="">Contact</a>
                    <a href="">Social</a>
                </div>
            </div>
        )
    }
}
export default NavComponent;