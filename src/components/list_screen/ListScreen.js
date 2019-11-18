import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { changeNameOwner, deleteList } from '../../store/actions/actionCreators';
import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }


    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), () => {
            this.props.changeNameOwner(this.props.todoList.id, this.state, target.id)
        }
        )
    }

    handleDeleteList = (e) => {
        this.props.deleteList(this.props.todoList.id)
        this.props.history.push("/")
    }

    render() {
        const auth = this.props.auth;
        //console.log(this.props)
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!todoList)
            return <React.Fragment />

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="right-align container">
                    <a class="blue lighten-2 waves-effect waves-light btn modal-trigger" href="#modal1">
                        <i class="material-icons">delete</i>
                    </a>
                    <Modal id="modal1" class="modal">
                        <div class="modal-content">
                            <h4>Delete List?</h4>
                            <p>Are you sure you want to delete this list?</p>
                            <p>This list will not be retrievable.</p>
                        </div>
                        <div className="grid right-align">
                            <Button onClick={this.handleDeleteList}>yes</Button>
                            <React.Fragment> </React.Fragment>
                            <Button className="modal-close">no</Button>
                        </div>
                    </Modal>
                </div>
                <div>
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div>
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                <div style={{left: '45%'}}className="btn-floating material-icons center-align blue lighten-2">add</div>
                <div className="card z-depth-0 todo-list-link blue darken-8" id="list_items_container">
                    <div className="list_item_header_card"></div>
                    <div className="list_item_task_header white-text">
                        Task
                        </div>
                    <div className='list_item_due_date_header white-text'>
                        Due Date
                        </div>
                    <div className='list_item_status_header white-text'>
                        Status
                        </div>
                </div>

                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if (todoList)
        todoList.id = id;

    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeNameOwner: (listId, state, targetId) => dispatch(changeNameOwner(listId, state, targetId)),
        deleteList: (listId) => dispatch(deleteList(listId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(withRouter(ListScreen));