export function saveToLocalStorage(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocalStorage(key) {
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
        console.warn(error);
    }

    return {};
}