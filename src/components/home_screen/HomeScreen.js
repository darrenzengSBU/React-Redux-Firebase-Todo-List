import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'

import { createTodoList } from '../../store/actions/actionCreators';

class HomeScreen extends Component {
    //dummy state for new todoLists
    state = {
        name: 'New List',
        owner: ''
    }


    handleNewList = (e) => {
        //console.log('new list')
        this.props.createTodoList(this.state)
        console.log(this.props.todoLists)
        this.goNewList()
    }

    goNewList = () => {
        setTimeout(() => {
            this.props.history.push("/todoList/" + this.props.todoLists[0].id)
        }, 10);
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container white z-depth-1">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTodoList: (todoList) => dispatch(createTodoList(todoList))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['timeStamp', 'desc'] },
    ]),
)(withRouter(HomeScreen));