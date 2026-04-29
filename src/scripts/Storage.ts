const correctStorage = _getCorrectStorage();

function _getCorrectStorage(): Storage {
    if ("undefined" === typeof localStorage) {
        return sessionStorage;
    }

    try {
        const testKey = "featureTest";
        const testValue = "featureVal";

        localStorage.setItem(testKey, testValue);

        if (testValue === localStorage.getItem(testKey)) {
            localStorage.removeItem(testKey);

            return localStorage;
        }
    } finally {
        return sessionStorage;
    }
}

function getItemFromStorage(name: string): string | null {
    return correctStorage.getItem(name);
}

function setItemInStorage(name: string, item: string | null): void {
    if (undefined === item) {
        return;
    }

    if (null == item) {
        correctStorage.removeItem(name);
    }
    else {
        correctStorage.setItem(name, item);
    }
}

export { getItemFromStorage, setItemInStorage };
