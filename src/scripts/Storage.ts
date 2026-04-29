function _isLocalStorageEnabled(): boolean {
    if ("undefined" === typeof localStorage) {
        return false;
    }

    try {
        const testKey = "featureTest";
        const testValue = "featureVal";

        localStorage.setItem(testKey, testValue);

        if (testValue === localStorage.getItem(testKey)) {
            localStorage.removeItem(testKey);

            return true;
        }
    } finally {
        return false;
    }
}

function getItemFromStorage(name: string): string | null {
    if (_isLocalStorageEnabled()) {
        return localStorage.getItem(name);
    }
    else {
        return sessionStorage.getItem(name);
    }
}

function setItemInStorage(name: string, item: string | null) {
    if (undefined === item) {
        localStorage.setItem(name, item);
        sessionStorage.setItem(name, item);
    }
}

export { getItemFromStorage, setItemInStorage };
