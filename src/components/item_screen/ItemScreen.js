import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { DatePicker, Checkbox } from 'react-materialize';
import { modifyItem } from '../../store/actions/actionCreators';

class ItemScreen extends Component {
    componentDidMount() {
        const id = this.props.match.params.id
        const key = this.props.match.params.key
        const { todoLists } = this.props
        var item
        var todoListId
        if (todoLists) {
            for (let i = 0; i < todoLists.length; i++) {
                if ('todoList' + todoLists[i].id === id) {
                    item = todoLists[i].items[key]
                    todoListId = todoLists[i].id
                    break;
                }
            }
        }
        if(item){
            this.setState({
                description: item.description,
                assigned_to: item.assigned_to,
                due_date: item.due_date,
                completed: item.completed
            })
        }
    }

    componentDidUpdate() {
        // console.log(this.state)
        // console.log(this.props)
    }

    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        const key = this.props.match.params.key
        const { todoLists } = this.props
        this.props.modifyItem(id, key, todoLists, this.state)
        this.props.history.push("/todoList/" + this.props.match.params.id.substring(8,this.props.match.params.id.length))
        // console.log(this.props)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleDateChange = (e) => {
        //console.log(e)
        this.setState({
            due_date: e
        })
    }

    handleCompletedChange = (e) => {
        //console.log(this.state.completed)
        const completed = this.state.completed
        this.setState({
            completed: !completed
        })
    }

    render() {
        const id = this.props.match.params.id
        const key = this.props.match.params.key
        const { todoLists } = this.props
        //console.log(this.props)
        //console.log(todoLists)
        var item
        var todoListId
        if (todoLists) {
            for (let i = 0; i < todoLists.length; i++) {
                //console.log(todoLists[i].id)
                //console.log(id)
                if ('todoList' + todoLists[i].id === id) {
                    item = todoLists[i].items[key]
                    todoListId = todoLists[i].id
                    break;
                }
            }
            //this.state.completed = item.completed
        }
        //console.log(item)

        if (item) {
            return (
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Item</h5>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input type="text" id='description' onChange={this.handleChange} defaultValue={item.description} />
                        </div>
                        <div>
                            <label htmlFor="assigned_to">Assigned To:</label>
                            <input type="text" id='assigned_to' onChange={this.handleChange} defaultValue={item.assigned_to} />
                        </div>
                        <div>
                            <label htmlFor="due_date">Due Date:</label>
                            <DatePicker type="date_picker" id='due_date' onChange={this.handleDateChange} defaultValue={item.due_date} />
                        </div>
                        <div>
                            <label htmlFor="completed">Completed:</label>
                            <Checkbox label='' type="checkbox" id='completed' onChange={this.handleCompletedChange} defaultValue={item.completed} />
                        </div>
                        <div className="grid">
                            <button className="btn blue light-1 z-depth-0" onClick={this.handleSubmit}>submit</button>
                            <React.Fragment> </React.Fragment>
                            <Link to={'/todoList/' + todoListId}>
                                <button className="btn blue light-1 z-depth-0">cancel</button>
                            </Link>
                        </div>

                    </form>
                </div>
            )
        }

        return (
            <div>loading...</div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modifyItem: (listId, key, todoLists, state) => dispatch(modifyItem(listId, key, todoLists, state))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' }
    ])
)(withRouter(ItemScreen))
