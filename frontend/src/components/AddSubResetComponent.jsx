import React from 'react'
class AddSubResetComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSub = this.handleSub.bind(this);
        this.reset = this.reset.bind(this);
    }
    handleAdd() {
        this.setState((state) => ({
            count: state.count + 1
        }))
    }
    handleSub() {
        this.setState((state) => ({
            count: state.count - 1
        }))
    }
    reset() {
        this.setState({
            count: 0
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.handleAdd}>Add</button>
                <button onClick={this.handleSub}>Sub</button>
                <button onClick={this.reset}>Reset</button>
                <h1>{this.state.count}</h1>
            </div>
        )
    }
}
export default AddSubResetComponent;