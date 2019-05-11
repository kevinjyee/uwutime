// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function schedule_profile(state = [], action){
    switch(action.type) {
        case 'REQUEST_SCHEDULE_PROFILE':
            console.log('Requesting Schedule Profile...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_SCHEDULE_PROFILE':
            console.log('Received_Schedule_Profiles');
            return { state, isLoading: false, action, payload: action.payload};
        default:
            return state;
    }
}

export default schedule_profile;