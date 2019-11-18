import React from 'react';
import ItemCardCompleted from './ItemCardCompleted';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { moveUp, moveDown, deleteItem } from '../../store/actions/actionCreators';

class ItemCard extends React.Component {

    handleMoveUp = (e) => {
        e.preventDefault();
        this.props.moveUp(this.props.todoList.id, this.props.item.key)
    }

    handleMoveDown = (e) => {
        e.preventDefault();
        this.props.moveDown(this.props.todoList.id, this.props.item.key)
    }

    handleDeleteItem = (e) => {
        e.preventDefault();
        this.props.deleteItem(this.props.todoList.id, this.props.item.key)
    }

    render() {
        const { item, todoList } = this.props;
        //console.log(this.props)
        return (
            <Link to={'./todoList' + todoList.id + '/' + item.key}>
                <div className="card z-depth-1 todo-list-link blue lighten-5">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{item.description}</span>
                        <div>Assigned To: <strong>{item.assigned_to}</strong></div>
                    </div>
                    <div className='list_item_card_due_date grey-text text-darken-3'>
                        {item.due_date}
                    </div>
                    <div className='list_item_card_completed'>
                        <ItemCardCompleted completed={item.completed} />
                    </div>
                    <Button
                        floating
                        fab={{ direction: 'right' }}
                        className="blue lighten-2"
                        large
                        style={{ left: '80%', position: 'absolute' }}
                    >
                        <Button onClick={this.handleDeleteItem} floating icon={<Icon>highlight_off</Icon>} className="red" />
                        <Button onClick={this.handleMoveDown} floating icon={<Icon>arrow_downward</Icon>} className="yellow darken-1" />
                        <Button onClick={this.handleMoveUp} floating icon={<Icon>arrow_upward</Icon>} className="green" />
                    </Button>
                </div>
            </Link>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveUp: (listId, key) => dispatch(moveUp(listId, key)),
        moveDown: (listId, key) => dispatch(moveDown(listId, key)),
        deleteItem: (listId, key) => dispatch(deleteItem(listId, key))
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' }
    ])
)(ItemCard)
