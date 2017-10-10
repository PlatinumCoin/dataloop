import { Component } from 'react';
import { DispatchPriority } from './Dispatcher';
import { DispatcherProperty } from './Provider';

export default class Container extends Component {
  static from(render, calculateState) {
    return class extends Container {
      calculateState(state, props, context) {
        return calculateState(state, props, context);
      }

      render() {
        return render(this.state, this.props);
      }
    }
  }

  static get contextTypes() {
    return { dispatcher: DispatcherProperty };
  }

  constructor(props, context) {
    super(props, context);
    this.priority = DispatchPriority.Presentation;
    this.state = this.calculateState(null, props, context);
  }

  calculateState() {
    throw new Error('Abstract method calculateState() is not implemented');
  }

  receive() {
    this.setState(state => this.calculateState(state, this.props, this.context));
  }

  componentDidMount() {
    this.context.dispatcher.register(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(state => this.calculateState(state, nextProps, nextContext));
  }

  componentWillUnmount() {
    this.context.dispatcher.unregister(this);
  }
}
