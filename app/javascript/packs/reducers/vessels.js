// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function vessels(state = [], action){
    switch(action.type) {
        case 'REQUEST_VESSELS':
            console.log('Requesting Vessels...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_VESSELS':
            console.log('Received_Vessels');
            return { state, isLoading: false, action, payload: action.payload};
        case 'ADD_VESSEL_STARTED':
            console.log('Adding Vessel');
            return { state, isLoading: true}
        case 'ADD_VESSEL_EVENT':
            return { state, isLoading: false, action, payload: [...state.payload, action.payload]}
        default:
            return state;
    }
}

export default vessels;