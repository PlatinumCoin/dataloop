import Heap from './Heap';

export const DispatchPriority = {
  Persistence: 0,
  Presentation: 1,
};

export default class Dispatcher {
  constructor() {
    this.listeners = new Heap((a, b) => a.priority > b.priority ? -1 : 1);
    this.isDispatching = false;
  }

  dispatch(action) {
    if (this.isDispatching) {
      throw new Error('Cannot dispatch in the middle of dispatch');
    }

    this.isDispatching = true;

    for (let index = 0; index < this.listeners.length; index++) {
      const listener = this.listeners.get(index);

      try {
        listener.receive(action);
      } catch (error) {
        console.error(listener, error);
      }
    }

    this.isDispatching = false;
  }

  register(listener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.insert(listener);
    }
  }

  unregister(listener) {
    this.listeners.delete(listener);
  }
}
