import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'oss-web-toolkits';
import GlobalMessage from '@Common/global-message';

export function createStore(initialState, constantsMap) {
    let currentState = _.isPlainObject(initialState) ? _.cloneDeep(initialState) : {};
    let currentListeners = {};

    Object.keys(initialState).forEach((key) => {
        currentListeners[key] = [];
    });

    function getState() {
        return currentState;
    }

    function modifyState(key, newVal) {
        return Object.assign(currentState, { [key]: newVal });
    }

    function dispatch(action) {
        if (!_.isPlainObject(action)) {
            throw new Error(`Actions must be plain objects. `);
        }

        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
        }

        if (!Object.values(constantsMap).includes(action.type)) {
            throw new Error('只能派发属于该store初始状态的key');
        }

        if (currentState[action.type] === action.data) {
            return;
        }
        currentState = modifyState(action.type, action.data);

        GlobalMessage.postMessage(`${constantsMap.projectEventNamePrefix}-${action.type}`, 'switch', action.data);

        return action;
    }

    function subscribe(action, listener) {
        GlobalMessage.on('message', `${constantsMap.projectEventNamePrefix}-${action.type}`, ({ data }) => {
            listener(data);
        });
    }

    function reset() {
        currentState = _.cloneDeep(initialState);
    }

    return {
        getState,
        modifyState,
        dispatch,
        subscribe,
        reset,
    };
}

const SYMBOL_DID_MOUNT = Symbol('SYMBOL_DID_MOUNT');

// 入参 defaultState
function bindStore(store) {
    return function (mapStateToProps, mapActionToProps) {
        // 为{}或者返回值为{},类似react-redux中connect方法的mapStateToProps和mapDispatchToProps参数
        if (_.isFunction(mapStateToProps) && _.isPlainObject(mapStateToProps())) {
            mapStateToProps = mapStateToProps();
        } else if (!_.isPlainObject(mapStateToProps)) {
            mapStateToProps = {};
        }

        if (_.isFunction(mapActionToProps) && _.isPlainObject(mapActionToProps())) {
            mapActionToProps = mapActionToProps();
        } else if (!_.isPlainObject(mapActionToProps)) {
            mapActionToProps = {};
        }
        return function (TargetComponent) {
            class Index extends React.PureComponent {
                constructor(props) {
                    super(props);

                    this.state = {
                        ...this.initStateProps(),
                        ...this.initActionProps(),
                    };
                }

                [SYMBOL_DID_MOUNT] = false;

                componentDidMount() {
                    this[SYMBOL_DID_MOUNT] = true;
                }

                componentWillUnmount() {
                    this[SYMBOL_DID_MOUNT] = false;
                }

                initStateProps = () => {
                    const stateProps = {};
                    let stateFieldMap = {};

                    if (_.isPlainObject(mapStateToProps)) {
                        stateFieldMap = mapStateToProps;
                    } else if (_.isFunction(mapStateToProps) && _.isPlainObject(mapStateToProps())) {
                        stateFieldMap = mapStateToProps();
                    }

                    for (let curKey in stateFieldMap) {
                        const sourceKey = stateFieldMap[curKey];

                        stateProps[curKey] = store.getState()[sourceKey];

                        store.subscribe({ type: sourceKey }, () => {
                            // 判断是否已改变在action方法中已判断
                            if (this[SYMBOL_DID_MOUNT]) {
                                this.setState({
                                    [curKey]: store.getState()[sourceKey],
                                });
                            } else {
                                Object.assign(this.state, {
                                    [curKey]: store.getState()[sourceKey],
                                });
                            }
                        });
                    }

                    return stateProps;
                };

                initActionProps = () => {
                    const actionProps = {};
                    let actionFieldMap = {};

                    if (_.isPlainObject(mapActionToProps)) {
                        actionFieldMap = mapActionToProps;
                    } else if (_.isFunction(mapActionToProps) && _.isPlainObject(mapActionToProps())) {
                        actionFieldMap = mapActionToProps();
                    }

                    for (let curKey in actionFieldMap) {
                        const sourceKey = actionFieldMap[curKey];

                        actionProps[curKey] = (arg) => {
                            const oldVal = store.getState()[sourceKey];
                            let newVal = arg;

                            if (_.isFunction(arg)) {
                                newVal = arg(oldVal);
                            }

                            store.dispatch({ type: sourceKey, data: newVal });
                        };
                    }

                    return actionProps;
                };

                render() {
                    const { curPageStatusInFramework } = this.props;
                    return <TargetComponent {...this.state} {...this.props} curPageStatusInFramework={curPageStatusInFramework} />;
                }
            }

            return connect((state) => {
                return { curPageStatusInFramework: state.curPageStatusInFramework };
            })(Index);
        };
    };
}

export default function attachModelGen(store) {
    return bindStore(store);
}

// attachModel(
//     () => {
//         return {
//             [aliasName]: [dependencyField],
//         };
//     },
//     () => {
//         return {
//             [aliasName]: [dependencyField],
//         };
//     }
// )(Index);
