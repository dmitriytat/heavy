export default function root(state, action) {
    switch (action.type) {
        case 'TIMEOUT':
            return onTimeout(state, action);
        case 'TIMEOUT_END':
            return onTimeoutEnd(state, action);
        default:
            return state;
    }
}

function onTimeout(state, { message }) {
    return {
        ...state,
        message,
    }
}

function onTimeoutEnd(state, { message }) {
    return {
        ...state,
        message,
    }
}
