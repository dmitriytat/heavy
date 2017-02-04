import {
    saveToLocalStorage
} from './utils/data';

export default function root(state, action) {
    const data = reducer(state, action);

    saveToLocalStorage('heavy', data);

    return data;
}

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_PAGE':
            return onChangePage(state, action);


        case 'ADD_TODAY':
            return onAddToday(state, action);
        case 'CHANGE_ELAPSED':
            return onChangeElapsed(state, action);

        
        case 'CHANGE_SETTINGS':
            return onChangeSettings(state, action);
        default:
            return state;
    }
}

function onChangePage(state, { page }) {
    return {
        ...state,
        page,
    }
}

function onAddToday(state) {
    return {
        ...state,
        elapsed: 0,
        worked: +state.worked + state.elapsed / 60, // to hours
    }
}

function onChangeElapsed(state, { elapsed }) {
    return {
        ...state,
        elapsed,
    }
}

function onChangeSettings(state, { settings }) {
    return {
        ...state,
        ...settings,
    }
}