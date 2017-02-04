export default function settingsReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_SETTINGS':
            return onChangeSettings(state, action);
        default:
            return state;
    }
}

function onChangeSettings(state, { settings }) {
    return {
        ...state,
        ...settings,
    }
}