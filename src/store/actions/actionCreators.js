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
            timeStamp: new Date()
        })
            .then(() => {
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

export const updateDate = (listId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId)
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(listId).update({ timeStamp: new Date() })
    }
}

export const changeNameOwner = (listId, state, targetId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(state, targetId)
        const firestore = getFirestore();
        if (targetId === 'name')
            firestore.collection('todoLists').doc(listId).update({ name: state.name })
        else
            firestore.collection('todoLists').doc(listId).update({ owner: state.owner })
                .then(dispatch({ type: 'CHANGE_NAME_OWNER', listId, state }))
    }
}

export const modifyItem = (listId, key, todoLists, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log("hi",todoLists)
        listId = listId.substring(8, listId.length)
        const firestore = getFirestore();
        var todoList;
        for (let i = 0; i < todoLists.length; i++) {
            if (todoLists[i].id === listId)
                todoList = todoLists[i]
        }
        todoList.items[key].assigned_to = state.assigned_to;
        todoList.items[key].completed = state.completed;
        todoList.items[key].description = state.description;
        todoList.items[key].due_date = state.due_date;
        //console.log(todoList)
        for (let i = 0; i < todoList.length; i++) {
            todoLists.items[i].key = i
        }
        //console.log("hello",todoList.items)
        firestore.collection('todoLists').doc(listId).update({ items: todoList.items })
            .then(dispatch({ type: 'MODIFY_ITEM', listId, key, todoLists, state }))
    }
}

export const addItem = (listId, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, state)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            items[items.length]={
                assigned_to: "Unknown",
                completed: false,
                description: "Unknown",
                due_date: "Unknown",
                key: items.length
            }
            //console.log(items)
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}

export const deleteList = (listId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId)
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(listId).delete();
    }
}

export const moveUp = (listId, key) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, key)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            if (key >= 1) {
                const element = items[key]
                items[key] = items[key - 1]
                items[key - 1] = element
                items[key].key = key;
                items[key - 1].key = key - 1
            }
            //console.log(items)
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}

export const moveDown = (listId, key) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, key)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            if (key < items.length - 1) {
                const element = items[key]
                items[key] = items[key + 1]
                items[key + 1] = element
                items[key].key = key;
                items[key + 1].key = key + 1
            }
            //console.log(items)
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}

export const deleteItem = (listId, key) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, key)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            items.splice(key, 1)
            for (let i = 0; i < items.length; i++) {
                items[i].key = i
            }
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}

export const sortByTask = (listId, order) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, key)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            if (order === 'ascending') {
                items.sort(function (a, b) {
                    var taskA = a.description.toLowerCase(), taskB = b.description.toLowerCase();
                    if (taskA < taskB)
                        return -1;
                    if (taskA > taskB)
                        return 1
                    return 0;
                })
                for (let i = 0; i < items.length; i++) {
                    items[i].key = i;
                }
            }
            else {
                items.sort(function (a, b) {
                    var taskA = a.description.toLowerCase(), taskB = b.description.toLowerCase();
                    if (taskA < taskB)
                        return 1;
                    if (taskA > taskB)
                        return -1
                    return 0;
                })
            }
            for (let i = 0; i < items.length; i++) {
                items[i].key = i
            }
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}

export const sortByDueDate = (listId, order) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, order)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            if (order === 'ascending') {
                items.sort(function (a, b) {
                    var taskA = a.due_date.toLowerCase(), taskB = b.due_date.toLowerCase();
                    if (taskA < taskB)
                        return -1;
                    if (taskA > taskB)
                        return 1
                    return 0;
                })
            }
            else {
                items.sort(function (a, b) {
                    var taskA = a.due_date, taskB = b.due_date;
                    if (taskA < taskB)
                        return 1;
                    if (taskA > taskB)
                        return -1
                    return 0;
                })
            }
            for (let i = 0; i < items.length; i++) {
                items[i].key = i
            }
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}

export const sortByStatus = (listId, order) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId, order)
        const firestore = getFirestore();
        var items
        var docRef = firestore.collection('todoLists').doc(listId)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //console.log(doc.data().items)
                items = doc.data().items
            } else (console.log('wow so much time wasted'))
            //console.log(items)
            if (order === 'ascending') {
                items.sort(function (a, b) {
                    var taskA = a.completed, taskB = b.completed;
                    if (taskA < taskB)
                        return -1;
                    if (taskA > taskB)
                        return 1
                    return 0;
                })
            }
            else {
                items.sort(function (a, b) {
                    var taskA = a.completed, taskB = b.completed;
                    if (taskA < taskB)
                        return 1;
                    if (taskA > taskB)
                        return -1
                    return 0;
                })
            }
            for (let i = 0; i < items.length; i++) {
                items[i].key = i
            }
            firestore.collection('todoLists').doc(listId).update({ items: items })
        })
    }
}