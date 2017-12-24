import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createStore } from '../redux';

chai.use(sinonChai);

describe('Redux', () => {
  describe('createStore', () => {
    it('should return a store with getState and dispatch', () => {
      const store = createStore();
      expect(store.getState).to.be.a('function');
      expect(store.dispatch).to.be.a('function');
    });
  });

  describe('store', () => {
    describe('getState', () => {
      it('should return the default state', () => {
        const store = createStore();
        expect(store.getState()).to.deep.equal({});
      });

      it('should return the initial state', () => {
        const obj = {
          foo: 'bar'
        };
        const store = createStore(obj);
        expect(store.getState()).to.deep.equal(obj);
      });
    });

    describe('dispatch', () => {
      it('should invoke the reducer with the state and action', () => {
        const reducer = sinon.spy();
        const store = createStore({}, reducer);
        const action = {
          type: 'ADD_PROP',
          prop: {
            key: 'foo',
            value: 'bar'
          }
        };
        store.dispatch(action);

        expect(reducer).to.have.been.calledWith({}, action);
      });

      it('should update the state with the result of the reducer', () => {
        const reducer = state => ({ foo: 'bar' });
        const store = createStore({}, reducer);
        const action = {
          type: 'FOO',
          foo: 'bar'
        };
        store.dispatch(action);
        const state = store.getState();

        expect(state).to.deep.equal({
          foo: 'bar'
        });
      });

      it('should validate action format', () => {
        const store = createStore({}, () => ({}));
        expect(() => store.dispatch({})).to.throw();
        expect(() => store.dispatch({ type: 'foo' })).to.not.throw();
      });
    });
  });
});
