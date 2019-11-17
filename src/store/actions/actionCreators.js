// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) {
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
// export function createTodoList(todoList) {
//     //console.log(todoList)
//     return {
//         type: 'CREATE_TODO_LIST',
//         todoList
//     }
// }

export const createTodoList = (todoList) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('todoLists').add({
            items: [],
            ...todoList,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_TODO_LIST', todoList });
        })
    }
}

export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}

export const changeNameOwner = (listId, state, targetId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //console.log(state, targetId)
        const firestore = getFirestore();
        if( targetId === 'name')
            firestore.collection('todoLists').doc(listId).update({name: state.name})
        else 
            firestore.collection('todoLists').doc(listId).update({owner: state.owner})
        .then(dispatch({ type: 'CHANGE_NAME_OWNER', listId, state}))
    }
}

export const modifyItem = (listId, key, todoLists, state) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //console.log("hi",todoLists)
        listId = listId.substring(8, listId.length)
        const firestore = getFirestore();
        var todoList;
        for (let i=0;i<todoLists.length;i++){
            if (todoLists[i].id === listId)
            todoList = todoLists[i]
        }
        todoList.items[key].assigned_to = state.assigned_to;
        todoList.items[key].completed = state.completed;
        todoList.items[key].description = state.description;
        //todoList.items[key].due_date = state.due_date;
        //console.log(todoList)
        for(let i=0; i<todoList.length; i++) {
            todoLists.items[i].key = i
        }
        //console.log("hello",todoList.items)
        firestore.collection('todoLists').doc(listId).update({items: todoList.items})
        .then(dispatch({ type: 'MODIFY_ITEM', listId, key, todoLists, state}))
    }
}

export const deleteList = (listId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //console.log(listId)
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(listId).delete();
    }
}