import Heap from '../Heap';

describe('Heap', () => {
  it('should add items to heap', () => {
    const heap = new Heap();

    heap.insert(10);
    heap.insert(8);
    heap.insert(3);
    heap.insert(13);
    heap.insert(1);
    heap.insert(0);

    expect(heap.items).toEqual([13, 10, 8, 0, 3, 1]);
  });

  it('should use custom comparator', () => {
    const heap = new Heap((a, b) => a > b ? -1 : 1);

    heap.insert(0);
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);
    heap.insert(4);
    heap.insert(4);
    heap.insert(4);
    heap.insert(4);
    heap.insert(2);
    heap.insert(2);

    expect(heap.items).toEqual([0, 1, 2, 2, 2, 3, 4, 4, 4, 4]);
  });

  it('should check an item existense', () => {
    const heap = new Heap();
    const value = 13;

    heap.insert(value);

    expect(heap.includes(value)).toBe(true);
  });

  it('should be possible to iterate over items', () => {
    const heap = new Heap();

    heap.insert(1);
    heap.insert(2);

    expect(heap.get(0)).toBe(2);
    expect(heap.get(1)).toBe(1);
  });

  it('should delete an item', () => {
    const heap = new Heap();
    const value = 13;

    heap.insert(value);
    heap.delete(value);

    expect(heap.includes(value)).toBe(false);
  });

  it('should not modify items on false deletion', () => {
    const heap = new Heap();
    const value = 13;

    spyOn(heap.items, 'splice');
    heap.delete(value);

    expect(heap.items.splice).not.toHaveBeenCalled();
  });
});
