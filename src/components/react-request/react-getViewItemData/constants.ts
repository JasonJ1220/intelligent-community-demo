const EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);

const EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);

const SYMBOL_ABORT_REQUEST = Symbol('SYMBOL_ABORT_REQUEST');

// oss-ui/data-status
const REQUEST_STATUS = {
    LOADING: 'loading',
    ERROR: 'error',
    EMPTY: 'empty',
    SUCCESS: 'success',
};

Object.freeze(REQUEST_STATUS);

export { EMPTY_OBJECT, EMPTY_ARRAY, SYMBOL_ABORT_REQUEST, REQUEST_STATUS };
