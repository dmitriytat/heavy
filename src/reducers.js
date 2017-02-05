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


        case 'SPREAD_OVER_ALL':
            return onSpreadOverAll(state, action);
        case 'MOVE_TODAY':
            return moveToday(state, action);
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
    const daysHours = state.daysHours.slice(0);

    daysHours[0] -= state.elapsed / 60;

    return {
        ...state,
        elapsed: 0,
        daysHours,
    }
}

function onChangeElapsed(state, { elapsed }) {
    return {
        ...state,
        elapsed,
    }
}

function onChangeSettings(state, { settings }) {
    let daysHours = [];
    let perDay = 0;

    if (settings.days) {
        perDay = state.hours / settings.days;
        for (let i = 0; i < settings.days; i++) {
            daysHours.push(perDay);
        }
    } else if (settings.hours) {
        perDay = settings.hours / state.days;
        for (let i = 0; i < state.days; i++) {
            daysHours.push(perDay);
        }
    } else {
        perDay = settings.hours / settings.days;
        for (let i = 0; i < settings.days; i++) {
            daysHours.push(perDay);
        }
    }
    const oldDate = Date.now();

    return {
        ...state,
        ...settings,
        daysHours,
        perDay,
        oldDate,
    }
}

function onSpreadOverAll(state) {
    const daysHours = [];
    const days = state.days - 1;

    const hours = state.daysHours.reduce((a,b) => (a+b), 0);

    const perDay = hours / days;

    for (let i = 0; i < days; i++) {
        daysHours.push(perDay);
    }

    const oldDate = Date.now();

    return {
        ...state,
        hours,
        days,
        daysHours,
        perDay,
        oldDate,
    }
}

function moveToday(state) {
    const daysHours = state.daysHours.slice(1);
    const days = state.days - 1;

    const hours = state.daysHours.reduce((a,b) => (a+b), 0);

    daysHours[0] += state.daysHours[0];
    const oldDate = Date.now();

    return {
        ...state,
        hours,
        days,
        daysHours,
        oldDate,
    }
}