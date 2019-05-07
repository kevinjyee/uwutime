// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function schedule_requests(state = [], action){
    switch(action.type) {
        case 'REQUEST_SCHEDULE':
            console.log('Requesting Schedule...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_SCHEDULE':
            console.log('Received_Schedule');
            return { state, isLoading: false, action, payload: action.payload};
        case 'ADD_SCHEDULE_SUCCESS':
            console.log('Request to Add');
            return {
                state,
                action,
                payload:  [...state.payload, action.payload],
                isLoading: false
            };
        case 'PUBLISH SCHEDULE_STARTED':
            console.log("Publishing Schedule...");
            return { state, isLoading: true, action, payload: action.payload };
        case 'PUBLISH_SCHEDULE_SUCCESS':
            console.log("Published Schedule");
            return {
                state,
                action,
                payload: [...Object.values(action.payload), ...state.payload],
                isLoading: false
            };
        case 'REMOVE_SCHEDULE_STARTED':
            console.log("Removing Schedule...");
        case 'REMOVE_SCHEDULE_SUCCESS':
            return {
                state,
                action,
                payload:  [...state.payload, action.payload],
                isLoading: false
            };
        case 'DELETE_TASK_STARTED':
            console.log("Deleting Task...");
        case 'DELETE_TASK_SUCCESS':
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

export default schedule_requests;