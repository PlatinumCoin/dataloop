export const DispatchPriority = {
  Persistence: 0,
  Presentation: 1,
};

export default function Dispatcher() {
  this.dispatch = jest.fn();
  this.register = jest.fn();
  this.unregister = jest.fn();
}
