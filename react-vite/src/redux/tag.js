const LOAD_TAGS = "tags/loadTags";
const TAG_CONTENTS = "tags/tagContents";
const LOAD_QUERY = "tags/loadQuery";

const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags
});

const tagContents = (name) => ({
    type: TAG_CONTENTS,
    name
});


const loadQuery = (query) => ({
    type: LOAD_QUERY,
    query
});

export const getAllTags = () => async dispatch => {
    const response = await fetch("/api/tags")
    if(response.ok) {
        const data = await response.json();
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
        return data;
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
};

export const loadSearchResults = (query) => async dispatch => {
    const response = await fetch(`/api/tags/${query}`)

    if(response.ok) {
        const data = await response.json();
        dispatch(loadQuery(data));
        return data;
    } else if(response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
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
        case LOAD_QUERY: {
            const newState = {...state, ...action.name};
            return newState;
        }


        default: return state;
    }
}

export default tagReducer;
