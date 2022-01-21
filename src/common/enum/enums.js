const PRIVATE_OPTIONS_SYMBOL = Symbol('[Options]');
const PRIVATE_NAME_SYMBOL = Symbol('[Name]');
const PRIVATE_RESET_SYMBOL = Symbol('[Reset]');
const PRIVATE_NAME_FUNC_SYMBOL = Symbol('[NameGetter]');

export class EnumItemClass {
    constructor(originItem, { enableNameCache = true } = {}) {
        this[PRIVATE_OPTIONS_SYMBOL] = arguments[1] || {
            enableNameCache: true,
        };
        Object.assign(this, originItem);
        if (this.id == null && this.value != null) {
            this.id = this.value;
        }
        if (this.name == null && this.text != null) {
            this.name = this.text;
        }
        if (typeof this.name === 'function') {
            this[PRIVATE_NAME_FUNC_SYMBOL] = this.name;
            let bakNameGetter = this.name;
            Object.defineProperty(this, 'name', {
                get() {
                    if (this[PRIVATE_OPTIONS_SYMBOL].enableNameCache) {
                        if (this[PRIVATE_NAME_SYMBOL] == null) {
                            this[PRIVATE_NAME_SYMBOL] = bakNameGetter();
                        }
                        return this[PRIVATE_NAME_SYMBOL] || '';
                    } else {
                        return bakNameGetter();
                    }
                },
                enumerable: true,
                configurable: false,
            });
        }
    }

    [PRIVATE_RESET_SYMBOL]({ enableNameCache = true } = {}) {
        this[PRIVATE_OPTIONS_SYMBOL] = arguments[0] || {
            enableNameCache: true,
        };
        delete this[PRIVATE_NAME_SYMBOL];
    }

    toString() {
        if (this.id != null) {
            return this.id.toString();
        } else {
            return this.id;
        }
    }

    valueOf() {
        return this.id;
    }
}

export class EnumClass {
    constructor(itemsArray, { enableNameCache = true } = {}) {
        Object.setPrototypeOf(Object.getPrototypeOf(this), Object.getPrototypeOf([]));
        if (!(itemsArray instanceof Array) && typeof itemsArray === 'object') {
            let newArray = [];
            for (let key in itemsArray) {
                if (itemsArray.hasOwnProperty(key)) {
                    let clonedObj = Object.assign({}, itemsArray[key]);
                    clonedObj.key = key;
                    newArray.push(clonedObj);
                }
            }
            itemsArray = newArray;
        }
        for (let originItem of itemsArray) {
            let enumItem = new EnumItemClass(originItem, arguments[0]);
            this.push(enumItem);
            let key = enumItem.key;
            if (typeof key === 'number') {
                key = 'key_' + key;
            }
            this[key] = enumItem;
        }
    }

    [PRIVATE_RESET_SYMBOL]({ enableNameCache = true } = {}) {
        if (this.length > 0) {
            for (let enumItem of this) {
                if (enumItem instanceof EnumItemClass) {
                    enumItem[PRIVATE_RESET_SYMBOL](arguments[0]);
                }
            }
        }
    }

    get(id) {
        // eslint-disable-next-line
        let enumItem = this.find((item) => item.id == id); // jshint ignore:line
        if (enumItem == null) {
            // eslint-disable-next-line
            enumItem = this.find((item) => item.key == id); // jshint ignore:line
        }
        return enumItem;
    }

    getName(ids, separator = ', ', idPath = 'id') {
        if (ids === null || ids === undefined) {
            return '';
        }

        if (!(ids instanceof Array) && !Array.isArray(ids)) {
            ids = [ids];
        }
        let texts = [];
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let matched = false;
            for (let k = 0; k < this.length; k++) {
                let item = this[k];
                /* jshint eqeqeq:false */
                // eslint-disable-next-line
                if (item.id == id) {
                    matched = true;
                    texts.push(item.name);
                } else {
                    // eslint-disable-next-line
                    if (item.id == id[idPath]) {
                        matched = true;
                        texts.push(item.name);
                        // eslint-disable-next-line
                    } else if (item.id == id[idPath]) {
                        matched = true;
                        texts.push(item.name);
                    }
                }
            }
            if (!matched) {
                texts.push(id);
            }
        }

        return texts.join(separator);
    }

    getFirstId() {
        if (this.length > 0) {
            return this[0].id;
        } else {
            return null;
        }
    }
}

function rebuild({ enableNameCache = true } = {}) {
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            let enumType = this[key];
            if (enumType instanceof EnumClass) {
                enumType[PRIVATE_RESET_SYMBOL](arguments[0]);
            } else if (typeof enumType === 'object' || Array.isArray(enumType)) {
                this[key] = new EnumClass(enumType, arguments[0]);
            }
        }
    }
}
export { rebuild };
