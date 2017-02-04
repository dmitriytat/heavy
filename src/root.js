import settingsReducer from './containers/settings/reducers';
import reducer from './reducers';

export default function root(state, action) {
    return {
        global: reducer(state.global, action),
        settings: settingsReducer(state.settings, action),
    }
}
