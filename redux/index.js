(function() {
    function createStore(reducer) {
        let currentState;
        let listenerList = [];
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
    }

    window.Redux = {
        createStore,
        combineReducers
    };
})();