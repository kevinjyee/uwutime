import axios from "axios/index";

// Fetch Schedule
export function fetchScheduleRequests() {
    return function(dispatch) {
        dispatch(requestSchedule());
        return axios.get('/schedule_requests').then(
            response => response,
            error => console.log('An error occurred', error)
        ).then(({data}) => {
            dispatch(receivedSchedule(data));
        })
    }
}

export function requestSchedule() {
    return {
        type: 'REQUEST_SCHEDULE'
    }
}

export function receivedSchedule(data) {
    return {
        type: 'RECEIVED_SCHEDULE',
        payload: data
    }
}


// Fetch Vessel
export function fetchVessels() {
    return function(dispatch) {
        dispatch(requestVessels());
        return axios.get('/vessels').then(
            response => response,
            error => console.log('An error occurred', error)
        ).then(({data}) => {
            dispatch(receivedVessels(data));
        })
    }
}

export function requestVessels() {
    return {
        type: 'REQUEST_VESSELS'
    }
}

export function receivedVessels(data) {
    return {
        type: 'RECEIVED_VESSELS',
        payload: data
    }
}


// Add Schedule
export const addScheduleRequests = (params) => {
    return dispatch => {
        dispatch(addScheduleStarted);
        axios.post('/schedule_requests', {
            schedule_request: params
        }).then( res => {
            dispatch(addSchedule(res.data));
        }).catch(err => {
            dispatch(addScheduleFailure(err.message));
        })
    };
};

const addScheduleStarted = () => ({
    type: 'ADD_SCHEDULE_STARTED'
});

const addSchedule = data => ({
    type: 'ADD_SCHEDULE_SUCCESS',
    payload: {...data}
});

const addScheduleFailure = error => ({
    type: 'ADD_SCHEDULE_FAILURE',
    payload: {
        error
    }
});


// Find or Initialize Schedule

export const publishSchedule = (params) => {
    return dispatch => {
        dispatch(publishScheduleStarted);
        axios.post('/schedule_requests/bulk_update', {
            schedule_request: params
        }).then( res => {
            dispatch(publishScheduleData(res.data));
        }).catch(err => {
            dispatch(publishScheduleFailure(err.message));
        })
    };
};


const publishScheduleStarted = () => ({
    type: 'PUBLISH_SCHEDULE_STARTED'
});

const publishScheduleData = data => ({
    type: 'PUBLISH_SCHEDULE_SUCCESS',
    payload: {...data}
});

const publishScheduleFailure = data => ({
    type: 'PUBLISH_SCHEDULE_FAILURE',
    payload: {...data}
});


// Remove an Event from Schedule

export const removeSchedule = (params) => {
    return dispatch => {
        dispatch(removeScheduleStarted);
        axios.put(`/schedule_requests/${params.id}`, {
            schedule_request: params
        }).then( res => {
            dispatch(removeScheduleEvent(res.data));
        }).catch(err => {
            dispatch(removeScheduleFailure(err.message));
        })
    };
}

const removeScheduleStarted = () => ({
    type: 'REMOVE_SCHEDULE_STARTED'
});

const removeScheduleEvent = data => ({
    type: 'REMOVE_SCHEDULE_SUCCESS',
    payload: {...data}
});

const removeScheduleFailure = data => ({
    type: 'REMOVE_SCHEDULE_FAILURE',
    payload: {...data}
});


// Remove a Task

export const deleteTask = (params) => {
    return dispatch => {
        dispatch(deleteTaskStarted);
        axios.delete(`/schedule_requests/${params.id}`, {
            schedule_request: params
        }).then( res => {
            dispatch(deleteTaskEvent(res.data));
        }).catch(err => {
            dispatch(deleteTaskFailure(err.message));
        })
    };
}

const deleteTaskStarted = () => ({
    type: 'DELETE_TASK_STARTED'
});

const deleteTaskEvent = data => ({
    type: 'DELETE_TASK_SUCCESS',
    payload: {...data}
});

const deleteTaskFailure = data => ({
    type: 'DELETE_TASK_FAILURE',
    payload: {...data}
});