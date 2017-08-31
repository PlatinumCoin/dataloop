jest.mock('../Dispatcher');

import Dispatcher from '../Dispatcher';
import Store, { StoreRegistry } from '../Store';

describe('Store', () => {
  const InitialState = [];

  class DefaultStore extends Store {
    getInitialState() {
      return InitialState;
    }
  }

  it('should have initial state', () => {
    const store = new DefaultStore();

    expect(store.state).toBe(InitialState);
    expect(store.getState()).toBe(InitialState);
  });

  it('should register a listener', () => {
    const dispatcher = new Dispatcher();
    const store = DefaultStore.of(dispatcher);

    expect(dispatcher.register).toHaveBeenCalledWith(store);
  });

  it('should be a singleton', () => {
    class CustomStore extends DefaultStore { }
    const dispatcher = new Dispatcher();
    const storeA = CustomStore.of(dispatcher);
    const storeB = CustomStore.of(dispatcher);

    expect(storeA).toBe(storeB);
    expect(StoreRegistry.get(CustomStore)).toBe(storeA);
  });

  it('should update state', () => {
    class CustomStore extends DefaultStore {
      reduce(state, action) {
        return state.concat(action);
      }
    }
    const store = new CustomStore();

    store.receive(1);

    expect(store.getState()).toEqual([1]);
  });

  it('should provide abstract methods', () => {
    class EmptyStore extends Store { }
    class NotFullStore extends Store { getInitialState() {} }

    expect(() => new EmptyStore()).toThrow('Abstract method getInitialState() is not implemented');
    expect(() => new NotFullStore().reduce()).toThrow('Abstract method reduce() is not implemented');
  });
});
