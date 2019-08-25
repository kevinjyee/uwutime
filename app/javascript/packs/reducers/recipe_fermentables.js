// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of the current state

function recipe_fermentables(state = [], action){
    switch(action.type) {
        case 'REQUEST_RECIPE_FERMENTABLES':
            console.log('Requesting Recipe Fermentable...')
            return { state, isLoading: true, action, payload: action.payload };
        case 'RECEIVED_RECIPE_FERMENTABLES':
            console.log('Received Recipe Fermentable');
            return { state, isLoading: false, action, payload: action.payload};
        case 'ADD_RECIPE_FERMENTABLE_STARTED':
            return { state, isLoading: true, action, payload: action.payload };
        case 'ADD_RECIPE_FERMENTABLE_SUCCESS':
            console.log('ADD RECIPE SUCCESSFUL');
            return {
                state,
                action,
                payload:  [...state.payload, action.payload],
                isLoading: false
            };
        case 'DELETE_RECIPE_FERMENTABLE_STARTED':
            console.log("Removing Recipe Fermentable...");
            return { state, isLoading: true }
        case 'DELETE_RECIPE_FERMENTABLE_SUCCESS':
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

export default recipe_fermentables;