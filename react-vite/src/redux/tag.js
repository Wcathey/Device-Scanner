const LOAD_TAGS = "tags/loadTags";
const TAG_DETAILS = "tags/tagTags";
const REMOVE_TAG = "tags/removeTag";
const UPDATE_TAG = "tags/updateTag";

const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags
});

const tagDetails = (tagId) => ({
    type: TAG_DETAILS,
    tagId
});

const removeTag = () => ({
    type: REMOVE_TAG

});

const updateTag = (tagId) => ({
    type: UPDATE_TAG,
    tagId
});

export const getAllTags = () => async dispatch => {
    const response = await fetch("/api/tags")
    if(response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(loadTags(data.tags));
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

export const getTagByid = (tagId) => async dispatch => {
    const response = await fetch(`/api/tags/${tagId}`)

    if(response.ok) {
        const data = await response.json();
        dispatch(tagDetails(data));
        return response;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

const initialState = {};

const tagReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_TAGS: {
            const newState = {...state, Tags: action.tags};
            return newState;
        }
        case TAG_DETAILS: {
            const newState = {...state, ...action.tagId};
            return newState;
        }

        default: return state;
    }
}

export default tagReducer;
