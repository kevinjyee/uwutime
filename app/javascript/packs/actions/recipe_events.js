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
export const updateRecipeEvent = params => (dispatch) => {
    dispatch(addRecipeEventStarted);
    axios.put(`/recipe_fermentables/${params.id}`, {
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

export const deleteRecipeEvent = params => (dispatch) => {
    dispatch(deleteRecipeEventStarted);
    axios.delete(`/recipe_fermentables/${params.id}`, {
        recipe_fermentables: params,
    }).then((res) => {
        dispatch(deleteRecipeEventEvent(res.data));
    }).catch((err) => {
        dispatch(deleteRecipeEventFailure(err.message));
    });
};

const deleteRecipeEventStarted = () => ({
    type: 'DELETE_TASK_STARTED',
});

const deleteRecipeEventEvent = data => ({
    type: 'DELETE_RECIPE_EVENT_SUCCESS',
    payload: { ...data },
});

const deleteRecipeEventFailure = data => ({
    type: 'DELETE_RECIPE_EVENT_FAILURE',
    payload: { ...data },
});
