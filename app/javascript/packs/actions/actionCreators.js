import axios from "axios/index";

//
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




