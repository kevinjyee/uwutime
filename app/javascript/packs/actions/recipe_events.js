import axios from 'axios/index';
// Fetch RecipeEvents
export const fetchRecipeEvents = params => (dispatch) => {
    dispatch(requestRecipeEvents);
    axios.get(`/recipe_events/${params.recipe_id}`, {
        params: {
            recipe_id: params.recipe_id,
        },
    }).then((res) => {
        dispatch(receivedRecipeEvents(res.data));
    }).catch((err) => {

    });
};

export function requestRecipeEvents() {
    return {
        type: 'REQUEST_RECIPE_EVENTS',
    };
}

export function receivedRecipeEvents(data) {
    return {
        type: 'RECEIVED_RECIPE_EVENTS',
        payload: data,
    };
}

// Update RecipeEvent
export const updateRecipeEvents = params => (dispatch) => {
    dispatch(updateRecipeEventStarted);
    axios.put(`/recipe_events/${params.id}`, {
        recipe_event: params,
    }).then((res) => {
        dispatch(updateRecipeEventSuccess(res.data));
    }).catch((err) => {
        dispatch(updateRecipeEventFailure(err.message));
    });
};

const updateRecipeEventStarted = () => ({
    type: 'UPDATE_RECIPE_EVENT_STARTED',
});

const updateRecipeEventSuccess = data => ({
    type: 'UPDATE_RECIPE_EVENT_SUCCESS',
    payload: { ...data },
});

const updateRecipeEventFailure = error => ({
    type: 'UPDATE_RECIPE_EVENT_FAILURE',
    payload: {
        error,
    },
});

// Add RecipeEvent
export const addRecipeEvent = params => (dispatch) => {
    dispatch(addRecipeEventStarted);
    axios.post('/recipe_fermentables', {
        recipe_fermentable: params,
    }).then((res) => {
        dispatch(addRecipeEventSuccess(res.data));
    }).catch((err) => {
        dispatch(addRecipeEventFailure(err.message));
    });
};

const addRecipeEventStarted = () => ({
    type: 'ADD_RECIPE_EVENT_STARTED',
});

const addRecipeEventSuccess = data => ({
    type: 'ADD_RECIPE_EVENT_SUCCESS',
    payload: { ...data },
});

const addRecipeEventFailure = error => ({
    type: 'ADD_RECIPE_EVENT_FAILURE',
    payload: {
        error,
    },
});


// Delete a RecipeEvent

export const deleteRecipeEvents = params => (dispatch) => {
    dispatch(deleteRecipeEventStarted);
    axios.put(`/recipe_events/${params.id}`, {
        recipe_event: params,
        destroy: true
    }).then((res) => {
        dispatch(deleteRecipeEventSuccess(res.data));
    }).catch((err) => {
        dispatch(deleteRecipeEventFailure(err.message));
    });
};

const deleteRecipeEventStarted = () => ({
    type: 'DELETE_RECIPE_EVENT_STARTED',
});

const deleteRecipeEventSuccess = data => ({
    type: 'DELETE_RECIPE_EVENT_SUCCESS',
    payload: { ...data },
});

const deleteRecipeEventFailure = data => ({
    type: 'DELETE_RECIPE_EVENT_FAILURE',
    payload: { ...data },
});
