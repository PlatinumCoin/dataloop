import React, { Component } from 'react';
import Dispatcher from './Dispatcher';

export function DispatcherProperty(props, propName, componentName) {
  if (!(props[propName] instanceof Dispatcher)) {
    throw new Error(`Invalid ${propName} supplied to ${componentName}`);
  }
}

export default class Provider extends Component {
  static get childContextTypes() {
    return { dispatcher: DispatcherProperty };
  }

  static get propTypes() {
    return { dispatcher: DispatcherProperty };
  }

  getChildContext() {
    return { dispatcher: this.props.dispatcher };
  }

  render() {
    return this.props.children;
  }
}
