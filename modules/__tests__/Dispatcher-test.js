jest.mock('../AsyncQueue');

import Dispatcher from '../Dispatcher';

describe('Dispatcher', async () => {
  it('should execute listeners', async () => {
    const dispatcher = new Dispatcher();
    const listenerA = { receive: jest.fn() };
    const listenerB = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.dispatch(payload);
    await dispatcher.spawn();

    expect(listenerA.receive).toHaveBeenCalledWith(payload);
    expect(listenerB.receive).toHaveBeenCalledWith(payload);
  });

  it('should execute listeners in order of their priority', async () => {
    const dispatcher = new Dispatcher();
    const history = [];
    const listenerA = { receive: jest.fn(() => history.push(0)), priority: 0 };
    const listenerB = { receive: jest.fn(() => history.push(2)), priority: 2 };
    const listenerC = { receive: jest.fn(() => history.push(1)), priority: 1 };
    const payload = { name: 'Liza' };

    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.register(listenerC);
    dispatcher.dispatch(payload);
    await dispatcher.spawn();

    expect(history).toEqual([0, 1, 2]);
  });

  it('should not register a listener twice', async () => {
    const dispatcher = new Dispatcher();
    const listener = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    dispatcher.register(listener);
    dispatcher.register(listener);
    dispatcher.dispatch(payload);
    await dispatcher.spawn();

    expect(listener.receive).toHaveBeenCalledTimes(1);
  });

  it('should allow nested dispatches', async () => {
    const dispatcher = new Dispatcher();
    const payloadA = { name: 'Liza' };
    const payloadB = { name: 'Ann' };
    const listener = { receive: jest.fn((payload) => {
      if (payload === payloadA) dispatcher.dispatch(payloadB);
    }) };

    dispatcher.register(listener);
    dispatcher.dispatch(payloadA);
    await dispatcher.spawn();

    expect(listener.receive).toHaveBeenCalledWith(payloadA);
    expect(listener.receive).toHaveBeenCalledWith(payloadB);
  });

  it('should not stop dispatch on failure', async () => {
    const dispatcher = new Dispatcher();
    const error = new Error('Oops');
    const listenerA = { receive: jest.fn(() => { throw error; }) };
    const listenerB = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    spyOn(console, 'error');
    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.dispatch(payload);
    await dispatcher.spawn();

    expect(console.error).toHaveBeenCalledWith(listenerA, error);
    expect(listenerB.receive).toHaveBeenCalledWith(payload);
  });

  it('should unregister listeners', async () => {
    const dispatcher = new Dispatcher();
    const listenerA = { receive: jest.fn() };
    const listenerB = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.unregister(listenerA);
    dispatcher.dispatch(payload);
    await dispatcher.spawn();

    expect(listenerA.receive).not.toHaveBeenCalled();
    expect(listenerB.receive).toHaveBeenCalledWith(payload);
  });

  it('should instantiate dispatcher with its lifecycle', () => {
    jest.spyOn(Dispatcher.prototype, 'spawn');
    const dispatcher = Dispatcher.create();

    expect(dispatcher).toBeInstanceOf(Dispatcher);
    expect(dispatcher.spawn).toHaveBeenCalled();
  });
});
