const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case 'CREATE_TODO_LIST':
            console.log('created todo list', action);
            return state; 
        case 'CREATE_TODO_LIST_ERROR':
            console.log(action.error)
            return state;
        case 'CHANGE_NAME_OWNER':
            return state;
        case 'MODIFY_ITEM':
            return state
        default:
            return state;
    }
};

export default todoListReducer;

