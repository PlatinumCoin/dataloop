import Dispatcher from '../Dispatcher';

describe('Dispatcher', () => {
  it('should execute listeners', () => {
    const dispatcher = new Dispatcher();
    const listenerA = { receive: jest.fn() };
    const listenerB = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.dispatch(payload);

    expect(listenerA.receive).toHaveBeenCalledWith(payload);
    expect(listenerB.receive).toHaveBeenCalledWith(payload);
  });

  it('should execute listeners in order of their priority', () => {
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

    expect(history).toEqual([0, 1, 2]);
  });

  it('should not register a listener twice', () => {
    const dispatcher = new Dispatcher();
    const listener = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    dispatcher.register(listener);
    dispatcher.register(listener);
    dispatcher.dispatch(payload);

    expect(listener.receive).toHaveBeenCalledTimes(1);
  });

  it('should throw on nested dispatch', () => {
    const dispatcher = new Dispatcher();
    const error = new Error('Cannot dispatch in the middle of dispatch');
    const listener = { receive: jest.fn(() => dispatcher.dispatch({})) };
    const payload = { name: 'Liza' };

    spyOn(console, 'error');
    dispatcher.register(listener);
    dispatcher.dispatch(payload)

    expect(console.error).toHaveBeenCalledWith(listener, error);
  });

  it('should not stop dispatch on failure', () => {
    const dispatcher = new Dispatcher();
    const error = new Error('Oops');
    const listenerA = { receive: jest.fn(() => { throw error; }) };
    const listenerB = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    spyOn(console, 'error');
    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.dispatch(payload);

    expect(console.error).toHaveBeenCalledWith(listenerA, error);
    expect(listenerB.receive).toHaveBeenCalledWith(payload);
  });

  it('should unregister listeners', () => {
    const dispatcher = new Dispatcher();
    const listenerA = { receive: jest.fn() };
    const listenerB = { receive: jest.fn() };
    const payload = { name: 'Liza' };

    dispatcher.register(listenerA);
    dispatcher.register(listenerB);
    dispatcher.unregister(listenerA);
    dispatcher.dispatch(payload);

    expect(listenerA.receive).not.toHaveBeenCalled();
    expect(listenerB.receive).toHaveBeenCalledWith(payload);
  });
});
