import Block from './block';

const createStore = (initialState = {}, reducer) => {
  let state = [new Block('0', initialState)];

  const getState = () => {
    return state[state.length - 1].data;
  };

  const dispatch = action => {
    if (!action.type) throw 'TYPE is a required key for action.';

    const lastBlock = state[state.length - 1];
    const newState = reducer(lastBlock.data, action);
    state.push(new Block(lastBlock.hash, newState));
  };

  const getBlockchain = () => {
    return state;
  };

  return {
    getState: getState,
    dispatch: dispatch,
    getBlockchain: getBlockchain
  };
};

export { createStore };
