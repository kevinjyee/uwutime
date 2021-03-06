import axios from 'axios/index';
export { fetchRecipeFermentables, addRecipeFermentable, deleteRecipeFermentable } from './recipe_fermentables';
export { fetchRecipeEvents, updateRecipeEvents, deleteRecipeEvents } from './recipe_events';
// Fetch Schedule
export function fetchScheduleRequests() {
    return function (dispatch) {
        dispatch(requestSchedule());
        return axios.get('/schedule_requests').then(
            response => response,
            error => console.log('An error occurred', error),
        ).then(({ data }) => {
            dispatch(receivedSchedule(data));
        });
    };
}

export function requestSchedule() {
    return {
        type: 'REQUEST_SCHEDULE',
    };
}

export function receivedSchedule(data) {
    return {
        type: 'RECEIVED_SCHEDULE',
        payload: data,
    };
}


// Fetch Vessel
export function fetchVessels() {
    return function (dispatch) {
        dispatch(requestVessels());
        return axios.get('/vessels').then(
            response => response,
            error => console.log('An error occurred', error),
        ).then(({ data }) => {
            dispatch(receivedVessels(data));
        });
    };
}

export function requestVessels() {
    return {
        type: 'REQUEST_VESSELS',
    };
}

export function receivedVessels(data) {
    return {
        type: 'RECEIVED_VESSELS',
        payload: data,
    };
}

// Add Vessel
export const addVessel = params => (dispatch) => {
        dispatch(addVesselStarted);
        axios.post('/vessels', {
            vessel: params,
        }).then((res) => {
            dispatch(addVesselEvent(res.data));
        }).catch((err) => {
            dispatch(addVesselFailure(err.message));
        });
    };

const addVesselStarted = () => ({
    type: 'ADD_VESSEL_STARTED',
});

const addVesselEvent = data => ({
    type: 'ADD_VESSEL_EVENT',
    payload: { ...data },
});

const addVesselFailure = error => ({
    type: 'ADD_VESSEL_FAILURE',
    payload: {
        error,
    },
});


// Add Schedule
export const addScheduleRequests = params => (dispatch) => {
        dispatch(addScheduleStarted);
        axios.post('/schedule_requests', {
            schedule_request: params,
        }).then((res) => {
            dispatch(addSchedule(res.data));
        }).catch((err) => {
            dispatch(addScheduleFailure(err.message));
        });
    };

const addScheduleStarted = () => ({
    type: 'ADD_SCHEDULE_STARTED',
});

const addSchedule = data => ({
    type: 'ADD_SCHEDULE_SUCCESS',
    payload: { ...data },
});

const addScheduleFailure = error => ({
    type: 'ADD_SCHEDULE_FAILURE',
    payload: {
        error,
    },
});


// Find or Initialize Schedule

export const publishSchedule = params => (dispatch) => {
        dispatch(publishScheduleStarted);
        axios.post('/schedule_requests/bulk_update', {
            schedule_request: params,
        }).then((res) => {
            dispatch(publishScheduleData(res.data));
        }).catch((err) => {
            dispatch(publishScheduleFailure(err.message));
        });
    };


const publishScheduleStarted = () => ({
    type: 'PUBLISH_SCHEDULE_STARTED',
});

const publishScheduleData = data => ({
    type: 'PUBLISH_SCHEDULE_SUCCESS',
    payload: { ...data },
});

const publishScheduleFailure = data => ({
    type: 'PUBLISH_SCHEDULE_FAILURE',
    payload: { ...data },
});


// Remove an Event from Schedule

export const removeSchedule = params => (dispatch) => {
        dispatch(removeScheduleStarted);
        axios.put(`/schedule_requests/`, {
            schedule_request: params,
        }).then((res) => {
            dispatch(removeScheduleEvent(res.data));
        }).catch((err) => {
            dispatch(removeScheduleFailure(err.message));
        });
    };

const removeScheduleStarted = () => ({
    type: 'REMOVE_SCHEDULE_STARTED',
});

const removeScheduleEvent = data => ({
    type: 'REMOVE_SCHEDULE_SUCCESS',
    payload: { ...data },
});

const removeScheduleFailure = data => ({
    type: 'REMOVE_SCHEDULE_FAILURE',
    payload: { ...data },
});


// Remove a Task

export const deleteTask = params => (dispatch) => {
        dispatch(deleteTaskStarted);
        axios.delete(`/schedule_requests/${params.id}`, {
            schedule_request: params,
        }).then((res) => {
            dispatch(deleteTaskEvent(res.data));
        }).catch((err) => {
            dispatch(deleteTaskFailure(err.message));
        });
    };

const deleteTaskStarted = () => ({
    type: 'DELETE_TASK_STARTED',
});

const deleteTaskEvent = data => ({
    type: 'DELETE_TASK_SUCCESS',
    payload: { ...data },
});

const deleteTaskFailure = data => ({
    type: 'DELETE_TASK_FAILURE',
    payload: { ...data },
});


// Fetch ScheduleProfiles
export function fetchScheduleProfiles() {
    return function (dispatch) {
        dispatch(requestScheduleProfiles());
        return axios.get('/schedule_profiles').then(
            response => response,
            error => console.log('An error occurred', error),
        ).then(({ data }) => {
            dispatch(receivedScheduleProfiles(data));
        });
    };
}

export function requestScheduleProfiles() {
    return {
        type: 'REQUEST_SCHEDULE_PROFILES',
    };
}

export function receivedScheduleProfiles(data) {
    return {
        type: 'RECEIVED_SCHEDULE_PROFILES',
        payload: data,
    };
}


// Fetch ScheduleProfile

export const fetchScheduleProfile = params => (dispatch) => {
        dispatch(requestScheduleProfile);
        axios.get(`/schedule_profiles/${params.id}`, {
            schedule_request: params,
        }).then((res) => {
            dispatch(receivedScheduleProfile(res.data));
        }).catch((err) => {

        });
    };

export function requestScheduleProfile() {
    return {
        type: 'REQUEST_SCHEDULE_PROFILE',
    };
}

export function receivedScheduleProfile(data) {
    return {
        type: 'RECEIVED_SCHEDULE_PROFILE',
        payload: data,
    };
}


// Fetch Recipes
export function fetchRecipes() {
    return function (dispatch) {
        dispatch(requestRecipes());
        return axios.get('/recipes').then(
            response => response,
            error => console.log('An error occurred', error),
        ).then(({ data }) => {
            dispatch(receivedRecipes(data));
        });
    };
}

export function requestRecipes() {
    return {
        type: 'REQUEST_RECIPES',
    };
}

export function receivedRecipes(data) {
    return {
        type: 'RECEIVED_RECIPES',
        payload: data,
    };
}

// Fetch Recipe
export const fetchRecipe = params => (dispatch) => {
        dispatch(requestRecipe);
        axios.get(`/recipes/${params.id}`, {
            id: params.id,
        }).then((res) => {
            dispatch(receivedRecipe(res.data));
        }).catch((err) => {

        });
    };

export function requestRecipe() {
    return {
        type: 'REQUEST_RECIPE',
    };
}

export function receivedRecipe(data) {
    return {
        type: 'RECEIVED_RECIPE',
        payload: data,
    };
}
