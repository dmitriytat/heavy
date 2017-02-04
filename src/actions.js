export function startTimeOut(message) {
    return {
        type: 'TIMEOUT',
        message,
    }
}

export function changePage(page) {
    return {
        type: 'CHANGE_PAGE',
        page,
    }
}
