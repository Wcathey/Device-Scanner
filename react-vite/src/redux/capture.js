
const UPLOAD_CAPTURE = "capture/uploadCapture";
const LOAD_CAPTURES = "capture/loadCaptures"
const CAPTURE_DETAILS = "capture/captureDetails";
const DELETE_CAPTURE = "capture/deleteCapture";
const ADD_CAPTURE_TAG = "capture/addCaptureTag";
const ADD_COMMENT = "capture/addComment";

const uploadCapture = (capture) => ({
    type: UPLOAD_CAPTURE,
    capture
});

const loadCaptures = (captures) => ({
    type: LOAD_CAPTURES,
    captures
});

const captureDetails = (captureId) => ({
    type: CAPTURE_DETAILS,
    captureId
});

const addCaptureTag = (captureId) => ({
    type: ADD_CAPTURE_TAG,
    captureId
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

const deleteCapture = () => ({
    type: DELETE_CAPTURE
});

export const getAllCaptures = () => async dispatch => {
    const response = await fetch("/api/captures")
    console.log(response)
    if(response.ok) {
        const data = await response.json();

        dispatch(loadCaptures(data.captures));
    }  else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
} else {
    return { server: "Something went wrong. Please try again"}
}
};

export const uploadCaptureMetaData = (captureData) => async dispatch => {
    const response = await fetch("/api/captures/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(captureData)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(uploadCapture(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

export const getCaptureDetailsById = (captureId) => async dispatch => {
    const response = await fetch(`/api/captures/${captureId}`)

    if(response.ok) {
        const data = await response.json();
        dispatch(captureDetails(data));
        return response;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

export const addTagToCapture = (captureId, tagName) => async dispatch => {
    const response = await fetch(`/api/captures/${captureId}/tag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagName)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addCaptureTag(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

export const addCommentToCapture = (captureId, comment) => async dispatch => {
    const response = await fetch(`/api/captures/${captureId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

export const deleteCaptureById = (captureId) => async dispatch => {
    const response = await fetch(`/api/captures/${captureId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCapture(data));
        dispatch(loadCaptures());
        return response;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again"}

    }
};

const initialState = {};

const captureReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_CAPTURE: {
            const newState = { ...state, ...action.captureData};
            return newState;
        }
        case LOAD_CAPTURES: {
            const newState = { ...state, Captures: action.captures};
            return newState;
        }
        case CAPTURE_DETAILS: {
            const newState = {...state, ...action.captureId};
            return newState;
        }
        case DELETE_CAPTURE: {
            const deletedCapture = action.captureId;
            const newState = {...state, deletedCapture};
            delete newState.deletedCapture;
            return newState;
        }

        default: return state;
    }
}

export default captureReducer;
