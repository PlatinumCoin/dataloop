jest.mock('../Dispatcher');

import Container from '../Container';
import Dispatcher from '../Dispatcher';
import { DispatcherProperty } from '../Provider';

describe('Container', () => {
  const calculateState = jest.fn();
  const render = jest.fn();
  const setState = jest.fn();

  class CustomContainer extends Container {
    get calculateState() { return calculateState; }
    get render() { return render; }
    get setState() { return setState; }
  }

  it('should expect dispatcher in context', () => {
    expect(Container.contextTypes.dispatcher)
      .toBe(DispatcherProperty);
  });

  it('should throw on abstract method', () => {
    expect(() => new Container())
      .toThrow('Abstract method calculateState() is not implemented');
  });

  it('should calculate initial state', () => {
    const props = {};
    const context = {};
    const container = new CustomContainer(props, context);

    expect(container.calculateState)
      .toHaveBeenCalledWith(null, props, context);
  });

  it('should register', () => {
    const dispatcher = new Dispatcher();
    const container = new CustomContainer(null, { dispatcher });

    container.componentDidMount();

    expect(dispatcher.register)
      .toHaveBeenCalledWith(container);
  });

  it('should unregister', () => {
    const dispatcher = new Dispatcher();
    const container = new CustomContainer(null, { dispatcher });

    container.componentWillUnmount();

    expect(dispatcher.unregister)
      .toHaveBeenCalledWith(container);
  });

  it('should re-calculate state on action', () => {
    const state = {};
    const props = {};
    const context = {};
    const container = new CustomContainer(props, context);

    setState.mockImplementation(fn => fn(state));
    container.receive();

    expect(container.calculateState)
      .toHaveBeenCalledWith(state, props, context);
  });

  it('should re-calculate state on props change', () => {
    const state = {};
    const props = {};
    const context = {};
    const nextProps = {};
    const nextContext = {};
    const container = new CustomContainer(props, context);

    setState.mockImplementation(fn => fn(state));
    container.componentWillReceiveProps(nextProps, nextContext);

    expect(container.calculateState)
      .toHaveBeenCalledWith(state, nextProps, nextContext);
  });

  it('should provide a shorthand syntax', () => {
    const state = {};
    const props = {};
    const context = {};
    const plainRender = jest.fn();
    const plainCalculateState = jest.fn(() => state);
    const ShorthandContainer = Container.from(plainRender, plainCalculateState);
    const container = new ShorthandContainer(props, context);

    container.render();

    expect(container instanceof Container)
      .toBeTruthy();

    expect(plainCalculateState)
      .toHaveBeenCalledWith(null, props, context);

    expect(plainRender)
      .toHaveBeenCalledWith(state, props);
  });
});
