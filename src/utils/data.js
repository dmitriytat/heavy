/**
 * saveToLocalStorage
 * @param key
 * @param data
 * @returns {boolean}
 */
export function saveToLocalStorage(key, data) {
    try {
        window.localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
}

/**
 * loadFromLocalStorage
 * @param key
 * @returns {boolean}
 */
export function loadFromLocalStorage(key) {
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
        console.warn(error);
        return {};
    }
}
