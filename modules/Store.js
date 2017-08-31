import { DispatchPriority } from './Dispatcher';

export const StoreRegistry = new Map();

export default class Store {
  static of(dispatcher) {
    if (StoreRegistry.has(this)) {
      return StoreRegistry.get(this);
    }

    const instance = new this();
    dispatcher.register(instance);
    StoreRegistry.set(this, instance);
    return instance;
  }

  constructor() {
    this.priority = DispatchPriority.Persistence;
    this.state = this.getInitialState();
  }

  receive(action) {
    this.state = this.reduce(this.state, action);
  }

  getState() {
    return this.state;
  }

  getInitialState() {
    throw new Error('Abstract method getInitialState() is not implemented');
  }

  reduce() {
    throw new Error('Abstract method reduce() is not implemented');
  }
}
