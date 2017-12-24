import { createStore } from './redux';

const store = createStore({}, (state, action) => {
  const newState = { ...state };
  newState[action.key] = action.value;
  return newState;
});

const addProp = (key, value) => {
  return {
    type: 'ADD_PROP',
    key,
    value
  };
};

store.dispatch(addProp('foo', 'bar'));
store.dispatch(addProp('baz', 'bax'));

console.log(store.getBlockchain());
