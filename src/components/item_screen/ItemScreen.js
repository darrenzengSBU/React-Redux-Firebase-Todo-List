import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemScreen extends Component {
    componentDidMount() {
        //console.log(this.props)
    }
    
    state = {
        description: '',
        assigned_to: '',
        due_data: '',
        completed: ''
    }

    handleSubmit = (e) => {
        console.log('submitted')
    }

    render() {
        const id = this.props.match.params.id
        const key = this.props.match.params.key
        //console.log(id,key)
        return (
            <div className="conatainer">
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">hello</h5>
                    <Link to='/'>
                    <button className="btn blue light-1 z-depth-0">cancel</button>
                    </Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        todoList: ''
    }
}

export default ItemScreen
