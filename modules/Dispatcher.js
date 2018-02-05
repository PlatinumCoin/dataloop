import AsyncQueue from './AsyncQueue';
import OrderedSet from './OrderedSet';

export const DispatchPriority = {
  Persistence: 0,
  Presentation: 1,
};

export default class Dispatcher {
  constructor() {
    this.actions = new AsyncQueue();
    this.listeners = new OrderedSet((a, b) => a.priority < b.priority ? -1 : 1);
  }

  dispatch(action) {
    this.actions.enqueue(action);
  }

  register(listener) {
    this.listeners.insert(listener);
  }

  unregister(listener) {
    this.listeners.delete(listener);
  }

  spawn() {
    function dispatchAction(action, listeners) {
      for (let index = 0; index < listeners.length; index++) {
        const listener = listeners.get(index);
        try {
          listener.receive(action);
        } catch (error) {
          console.error(listener, error);
        }
      }
    }

    function processNextAction(queue, listeners) {
      return queue.next().then(({ value, done }) => {
        if (!done && value) {
          dispatchAction(value, listeners);
          return processNextAction(queue, listeners);
        }
      });
    }

    return processNextAction(this.actions, this.listeners);
  }
}
