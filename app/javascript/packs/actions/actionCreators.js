import axios from "axios/index";
var $ = require('jquery')

export function fetchScheduleRequests() {
    return function(dispatch) {
        dispatch(requestSchedule());
        return axios.get('/schedule_requests').then(
            response => response,
            error => console.log('An error occurred', error)
        ).then(({data}) => {
            dispatch(receiveRequests(data));
        })
    }
}

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

export function requestSchedule() {
    return {
        type: 'REQUEST_SCHEDULE_REQUESTS'
    }
}

export function receiveRequests(data) {
    return {
        type: 'RECEIVED_SCHEDULE_REQUESTS',
        payload: data
    }
}

// schedule request
export function addRequest(data) {
        return {
            type: 'ADD_REQUESTS',
            newItem: data
    }
}

