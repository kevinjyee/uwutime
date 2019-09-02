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
        case 'ADD_RECIPE_EVENT_STARTED':
            return { state, isLoading: true, action, payload: action.payload };
        case 'ADD_RECIPE_EVENT_SUCCESS':
            console.log('ADD RECIPE EVENT SUCCESSFUL');
            return {
                state,
                action,
                payload:  [...state.payload, action.payload],
                isLoading: false
            };
        case 'DELETE_RECIPE_EVENT_STARTED':
            console.log("Removing Recipe Event...");
            return { state, isLoading: true }
        case 'DELETE_RECIPE_EVENT_SUCCESS':
            return {
                state,
                action,
                payload:  state.payload.filter((data, i) => data.id !== action.payload.id),
                isLoading: false
            }
        default:
            return state;
    }
}

export default recipe_events;