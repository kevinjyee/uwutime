// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function recipe_events(state = [], action) {
    switch (action.type) {
        case 'REQUEST_RECIPE_EVENTS':
            console.log('Requesting Recipe Events...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_RECIPE_EVENTS':
            console.log('Received Recipe Events');
            return { state, isLoading: false, action, payload: action.payload};
        case 'UPDATE_RECIPE_EVENT_STARTED':
            return { state, isLoading: true, action, payload: action.payload };
        case 'UPDATE_RECIPE_EVENT_SUCCESS':
            console.log('UPDATE RECIPE EVENT SUCCESSFUL');
            return {
                state,
                action,
                payload: action.payload,
                isLoading: false
            };
        case 'DELETE_RECIPE_EVENT_STARTED':
            console.log("Removing Recipe Events...");
            return { state, isLoading: true }
        case 'DELETE_RECIPE_EVENT_SUCCESS':
            return { state, isLoading: true, action, payload: action.payload };
        default:
            return state;
    }
}

export default recipe_events;