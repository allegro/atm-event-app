export const SOME_ACTION = "SOME_ACTION";
export const SOME_ASYNC_ACTION = "SOME_ASYNC_ACTION";

export const someAction = (text) => ({
    type: SOME_ACTION,
    payload: {
        text
    }
});
export const someAsyncAction = (text) => ({
    type: SOME_ASYNC_ACTION,
    payload: {
        text
    }
});

const initialState = {
    texts: []
};

export const someReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SOME_ACTION: {
            return {
                texts: [
                    ...state.texts,
                    payload.text
                ]
            };
        }
        default:
            return state;
    }
};