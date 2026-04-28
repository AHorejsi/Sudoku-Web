function getItemFromStorage(name: string): string | null {
    let item = localStorage.getItem(name);

    if (undefined === item) {
        item = sessionStorage.getItem(name);
    }

    return item;
}

function setItemInStorage(name: string, item: string | null) {
    if (undefined === item) {
        localStorage.setItem(name, item);
        sessionStorage.setItem(name, item);
    }
}

export { getItemFromStorage, setItemInStorage };
