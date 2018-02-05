import AsyncQueue from '../AsyncQueue';

describe('AsyncQueue', () => {
  it('should enqueue before dequeue', async () => {
    const queue = new AsyncQueue();
    queue.enqueue('A');
    queue.enqueue('B');
    const values = Promise.all([queue.next(), queue.next()]);
    expect(await values).toEqual([
      { value: 'A', done: false },
      { value: 'B', done: false },
    ]);
  });

  it('should dequeue before enqueue', async () => {
    const queue = new AsyncQueue();
    const values = Promise.all([queue.next(), queue.next()]);
    queue.enqueue('A');
    queue.enqueue('B');
    expect(await values).toEqual([
      { value: 'A', done: false },
      { value: 'B', done: false },
    ]);
  });
});
