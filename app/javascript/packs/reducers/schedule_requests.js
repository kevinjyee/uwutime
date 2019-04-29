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
            }
        default:
            return state;
    }
}

export default schedule_requests;