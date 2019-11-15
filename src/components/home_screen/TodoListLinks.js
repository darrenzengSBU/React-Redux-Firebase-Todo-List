import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    render() {
        const todoLists = this.props.todoLists;
        // if (todoLists)
        //     sortByDate(todoLists)
        // console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

function sortByDate(todoLists) {
    todoLists.sort(function (a, b) {
        var listA = a.createdAt, listB = b.createdAt;
        console.log ('hi',listA);
        if (listA < listB)
            return -1;
        if (listA > listB)
            return 1
        return 0;
    })
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);