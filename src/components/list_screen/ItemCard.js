import React from 'react';
import ItemCardCompleted from './ItemCardCompleted';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
    render() {
        const { item, todoList } = this.props;
        //console.log(this.props)
        return (
            <Link to={'./todoList' + todoList.id + '/' + item.key}>
                <div className="card z-depth-0 todo-list-link blue lighten-3">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{item.description}</span>
                        <div>Assigned To: <strong>{item.assigned_to}</strong></div>
                    </div>
                    <div className='list_item_card_due_date'>
                        {item.due_date}
                    </div>
                    <div className='list_item_card_completed'>
                        <ItemCardCompleted completed={item.completed} />
                    </div>
                </div>
            </Link>
        );
    }
}
export default ItemCard;