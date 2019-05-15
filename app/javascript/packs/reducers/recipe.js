// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function recipe(state = [], action){
    switch(action.type) {
        case 'REQUEST_RECIPE':
            console.log('Requesting Recipe...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_RECIPE':
            console.log('Received_Recipe');
            return { state, isLoading: false, action, payload: action.payload};
        default:
            return state;
    }
}

export default recipe;