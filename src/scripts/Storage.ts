function getItemFromStorage(name: string): string | null {
    let item = localStorage.getItem(name);

    if (undefined === item) {
        item = sessionStorage.getItem(name);
    }

    return item;
}

function setItemInStorage(name: string, value: string | null) {
    if (value) {
        localStorage.setItem(name, value);
        sessionStorage.setItem(name, value);
    }
}

export { getItemFromStorage, setItemInStorage };
