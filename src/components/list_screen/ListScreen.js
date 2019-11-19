import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateDate, changeNameOwner, addItem, deleteList, sortByTask, sortByDueDate, sortByStatus } from '../../store/actions/actionCreators';
import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        nextTaskOrder: 'ascending',
        nextDueDateOrder: 'ascending',
        nextStatusOrder: 'ascending'
    }

    componentDidMount(){
        this.props.updateDate(this.props.match.params.id)
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

    handleAddItem = (e) => {
        this.props.addItem(this.props.todoList.id, this.state)
    }

    goNewItem = (e) => {
        setTimeout(() => {
            console.log(this.props.todoList)
            this.props.history.push("/todoList/todoList" + this.props.todoList.id + '/' + this.props.todoList.items.length-1)
        }, 3000);
    }

    handleDeleteList = (e) => {
        this.props.deleteList(this.props.todoList.id)
        this.props.history.push("/")
    }

    handleSortByTask = (e) => {
        this.props.sortByTask(this.props.todoList.id, this.state.nextTaskOrder)
        if(this.state.nextTaskOrder=='ascending'){
            this.setState({nextTaskOrder: 'descending'})
        }
        else this.setState({nextTaskOrder: 'ascending'})
    }

    handleSortByDueDate = (e) => {
        this.props.sortByDueDate(this.props.todoList.id, this.state.nextDueDateOrder)
        if(this.state.nextDueDateOrder=='ascending'){
            this.setState({nextDueDateOrder: 'descending'})
        }
        else this.setState({nextDueDateOrder: 'ascending'})
    }

    handleSortByStatus = (e) => {
        this.props.sortByStatus(this.props.todoList.id, this.state.nextStatusOrder)
        if(this.state.nextStatusOrder=='ascending'){
            this.setState({nextStatusOrder: 'descending'})
        }
        else this.setState({nextStatusOrder: 'ascending'})
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
                <div className="card z-depth-1 todo-list-link blue darken-8" id="list_items_container">
                    <div className="list_item_header_card"></div>
                    <div onClick={this.handleSortByTask} className="list_item_task_header white-text">
                        Task
                        </div>
                    <div onClick={this.handleSortByDueDate} className='list_item_due_date_header white-text'>
                        Due Date
                        </div>
                    <div onClick={this.handleSortByStatus} className='list_item_status_header white-text'>
                        Status
                        </div>
                </div>
                <ItemsList todoList={todoList} />
                <div onClick={this.handleAddItem} style={{left: '45%'}}className="btn-floating material-icons center-align blue lighten-2">add</div>
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
        updateDate: (listId) => dispatch(updateDate(listId)),
        changeNameOwner: (listId, state, targetId) => dispatch(changeNameOwner(listId, state, targetId)),
        addItem: (listId, state) => dispatch(addItem(listId, state)),
        deleteList: (listId) => dispatch(deleteList(listId)),
        sortByTask: (listId, order) => dispatch(sortByTask(listId, order)),
        sortByDueDate: (listId, order) => dispatch(sortByDueDate(listId, order)),
        sortByStatus: (listId, order) => dispatch(sortByStatus(listId, order))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(withRouter(ListScreen));