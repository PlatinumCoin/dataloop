import OrderedSet from '../OrderedSet';

describe('OrderedSet', () => {
  it('should add items to set', () => {
    const set = new OrderedSet();

    set.insert(10);
    set.insert(8);
    set.insert(3);
    set.insert(13);
    set.insert(1);
    set.insert(0);

    expect(set.items).toEqual([13, 10, 8, 3, 1, 0]);
  });

  it('should use custom comparator', () => {
    const set = new OrderedSet((a, b) => a < b ? -1 : 1);

    set.insert(0);
    set.insert(1);
    set.insert(3);
    set.insert(4);
    set.insert(7);
    set.insert(5);
    set.insert(6);
    set.insert(2);

    expect(set.items).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it('should check an item existense', () => {
    const set = new OrderedSet();
    const value = 13;

    set.insert(value);

    expect(set.includes(value)).toBe(true);
  });

  it('should be possible to iterate over items', () => {
    const set = new OrderedSet();

    set.insert(1);
    set.insert(2);

    expect(set.get(0)).toBe(2);
    expect(set.get(1)).toBe(1);
  });

  it('should delete an item', () => {
    const set = new OrderedSet();
    const value = 13;

    set.insert(value);
    set.delete(value);

    expect(set.includes(value)).toBe(false);
  });

  it('should not modify items on false deletion', () => {
    const set = new OrderedSet();
    const value = 13;

    spyOn(set.items, 'splice');
    set.delete(value);

    expect(set.items.splice).not.toHaveBeenCalled();
  });
});
