const LOAD_TAGS = "tags/loadTags";
const TAG_CONTENTS = "tags/tagContents";
const REMOVE_TAG = "tags/removeTag";
const UPDATE_TAG = "tags/updateTag";

const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags
});

const tagContents = (name) => ({
    type: TAG_CONTENTS,
    name
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

export const getTagContentsByName = (name) => async dispatch => {

    const response = await fetch(`/api/tags/${name}`)

    if(response.ok) {
        const data = await response.json();
        dispatch(tagContents(data));
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
        case TAG_CONTENTS: {
            const newState = {...state, ...action.name};
            return newState;
        }

        default: return state;
    }
}

export default tagReducer;
