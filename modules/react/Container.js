import React, { Component } from 'react';
import { DispatchPriority } from '../Dispatcher';

function create(Base) {
  return class extends Base {
    priority = DispatchPriority.Presentation;

    constructor(props, context) {
      super(props, context);

      const dispatcher = Base.getDispatcher();
      dispatcher.register(this);

      this.state = {
        ...(this.state || {}),
        ...Base.calculateState(this.state, props, context),
      };
    }

    componentWillReceiveProps(props, context) {
      if(super.componentWillReceiveProps) {
        super.componentWillReceiveProps(props, context);
      }

      this.setState(state => Base.calculateState(state, props, context));
    }

    receive() {
      this.setState((state, props) => {
        return Base.calculateState(state, props, this.context);
      });
    }
  }
}

function createFunctional(render, getDispatcher, calculateState) {
  class FunctionalContainer extends Component {
    static getDispatcher() {
      return getDispatcher();
    }

    static calculateState(state, props, context) {
      return calculateState(state, props, context);
    }

    render() {
      return render(this.state);
    }
  }

  return create(FunctionalContainer);
}

export default { create, createFunctional };
