export default function createReducer(reducerMap, initialState) {
  return (state = initialState, action) => {
    let stateUpdates = state;
    const reducer = reducerMap[action.type];

    if (reducer) {
      stateUpdates = reducer(state, action.payload);
    }

    return stateUpdates === state ? state : { ...state, ...stateUpdates };
  };
}
