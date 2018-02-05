export default function AsyncQueue() {
  const values = [];

  this.enqueue = jest.fn((value) => {
    values.push(value);
  });

  this.next = jest.fn(() => {
    const value = values.shift();
    const done = value === undefined;
    return Promise.resolve({ value, done });
  });
}
