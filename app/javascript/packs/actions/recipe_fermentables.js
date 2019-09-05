import axios from 'axios/index';
// Fetch RecipeFermentables
export const fetchRecipeFermentables = params => (dispatch) => {
    dispatch(requestRecipeFermentables);
    axios.get('/recipe_fermentables', {
        params: {
            recipe_id: params.recipe_id,
        },
    }).then((res) => {
        dispatch(receivedRecipeFermentables(res.data));
    }).catch((err) => {

    });
};

export function requestRecipeFermentables() {
    return {
        type: 'REQUEST_RECIPE_FERMENTABLES',
    };
}

export function receivedRecipeFermentables(data) {
    return {
        type: 'RECEIVED_RECIPE_FERMENTABLES',
        payload: data,
    };
}

// Add RecipeFermentable
export const addRecipeFermentable = params => (dispatch) => {
    dispatch(addRecipeFermentableStarted);
    axios.post('/recipe_fermentables', {
        recipe_fermentable: params,
    }).then((res) => {
        dispatch(addRecipeFermentableSuccess(res.data));
    }).catch((err) => {
        dispatch(addRecipeFermentableFailure(err.message));
    });
};

const addRecipeFermentableStarted = () => ({
    type: 'ADD_RECIPE_FERMENTABLE_STARTED',
});

const addRecipeFermentableSuccess = data => ({
    type: 'ADD_RECIPE_FERMENTABLE_SUCCESS',
    payload: { ...data },
});

const addRecipeFermentableFailure = error => ({
    type: 'ADD_RECIPE_FERMENTABLE_FAILURE',
    payload: {
        error,
    },
});


// Delete a RecipeFermentable

export const deleteRecipeFermentable = params => (dispatch) => {
    dispatch(deleteRecipeFermentableStarted);
    axios.delete(`/recipe_fermentables/${params.id}`, {
        recipe_fermentables: params,
    }).then((res) => {
        dispatch(deleteRecipeFermentableEvent(res.data));
    }).catch((err) => {
        dispatch(deleteRecipeFermentableFailure(err.message));
    });
};

const deleteRecipeFermentableStarted = () => ({
    type: 'DELETE_TASK_STARTED',
});

const deleteRecipeFermentableEvent = data => ({
    type: 'DELETE_RECIPE_FERMENTABLE_SUCCESS',
    payload: { ...data },
});

const deleteRecipeFermentableFailure = data => ({
    type: 'DELETE_RECIPE_FERMENTABLE_FAILURE',
    payload: { ...data },
});
