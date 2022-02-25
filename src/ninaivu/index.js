import { useReducer } from 'react';

let currentState = {};

export function useDispatch() {
  //A hack to force component to rerender
  const [, forceUpdateComponent] = useReducer((x) => x + 1, 0);

  return (action) => {
    const newState = action.processor.call(
      null,
      currentState[action.storeName]
    );
    currentState = {
      ...currentState,
      [action.storeName]: newState,
    };
    forceUpdateComponent();
  };
}

export function useNinaivu(valueSelector) {
  // Call the selector function to extract the desired value
  return valueSelector.call(null, currentState);
}

export function createSlice(sliceConfig) {
  currentState[sliceConfig.name] = sliceConfig.initialState;

  // Create actions based on the reducer
  const actions = Object.entries(sliceConfig.reducers).reduce(
    createAction(sliceConfig),
    {}
  );

  return { actions };
}

// Create an action block which can be used by dispatch to execute
function createAction(sliceConfig) {
  return (previousActions, reducer) => {
    const [actionName, action] = reducer;
    return {
      ...previousActions,
      [actionName]: () => ({
        storeName: sliceConfig.name,
        processor: action,
      }),
    };
  };
}

