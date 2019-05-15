// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function recipes(state = [], action){
    switch(action.type) {
        case 'REQUEST_RECIPES':
            console.log('Requesting Recipes...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_RECIPES':
            console.log('Received_Recipes');
            return { state, isLoading: false, action, payload: action.payload};
        default:
            return state;
    }
}

export default recipes;