export const INITIAL_STATE = {
    shortLink: '',
    loading: '',
    message: '',
    error: ''
}

export const linkReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state, loading: true
            }
        case 'FETCH_SUCCESS':
            return {
                ...state, message: action.payload.message, shortLink: action.payload.shortLink, loading: false, error: ''
            }
        case 'FETCH_ERROR':
            return {
                ...state, error: action.payload, loading: false, message: ''
            }
        case 'COPY':
            return {
                ...state, error: "", loading: false, message: action.payload
            }
        default:
            return state
    }
}