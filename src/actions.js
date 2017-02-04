export function changePage(page) {
    return {
        type: 'CHANGE_PAGE',
        page,
    }
}

export function addToday() {
    return {
        type: 'ADD_TODAY',
    }
}

export function changeElapsed(elapsed) {
    return {
        type: 'CHANGE_ELAPSED',
        elapsed,
    }
}

export function changeSettings(settings) {
    return {
        type: 'CHANGE_SETTINGS',
        settings,
    }
}