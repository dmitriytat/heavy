export default function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_PAGE':
            onChangePage(state, action);
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