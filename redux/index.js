(function() {
    const initAction = {
        type: '@@REDUX/INIT'
    };
    function createStore(reducer) {
        let listenerList = [];
        
        let currentState = reducer(currentState, initAction);
        function subscribe(listener) {
            listenerList.push(listener);
        }
        function getState() {
            return currentState;
        }
        function dispatch(action) {
            currentState = reducer(currentState, action);
            listenerList.forEach(listener => {
                listener();
            });
        }
        return {
            subscribe,
            getState,
            dispatch
        }
    }

    function combineReducers(reducers) {
        let reducerKeys = Object.keys(reducers);
        let nextState = {};
        return function(state, action) {
            for (let i = 0; i < reducerKeys.length; i++) {
                let sKey = state === undefined ? undefined : state[Object.keys(state)[i]];
                nextState[reducerKeys[i]] = reducers[reducerKeys[i]](sKey, action);
            }
            return nextState;
        }
    }

    window.Redux = {
        createStore,
        combineReducers
    };
})();