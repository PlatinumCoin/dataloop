import Dispatcher from '../Dispatcher';
import Provider, { DispatcherProperty } from '../Provider';

describe('Provider', () => {
  it('should expect a dispatcher', () => {
    const dispatcher = new Dispatcher();
    const props = { dispatcher };
    const componentName = 'SomeComponent';

    expect(() => DispatcherProperty(props, 'dispatcher', componentName))
      .not.toThrow();

    expect(() => DispatcherProperty({}, 'dispatcher', componentName))
      .toThrow('Invalid dispatcher supplied to SomeComponent');
  });

  it('should require a dispatcher in props', () => {
    expect(Provider.propTypes.dispatcher)
      .toBe(DispatcherProperty);
  });

  it('should provide a dispatcher throught context', () => {
    const dispatcher = new Dispatcher();
    const provider = new Provider({ dispatcher });

    expect(Provider.childContextTypes.dispatcher)
      .toBe(DispatcherProperty);

    expect(provider.getChildContext().dispatcher)
      .toBe(dispatcher);
  });

  it('should render children', () => {
    const children = {};
    const provider = new Provider({ children });

    expect(provider.render())
      .toBe(children);
  });
});
