export default class OrderedSet {
  constructor(comparator = defaultComparator) {
    this.comparator = comparator;
    this.items = [];
  }

  get length() {
    return this.items.length;
  }

  get(index) {
    return this.items[index];
  }

  insert(item) {
    if (!this.includes(item)) {
      binaryInsert(item, this.items, this.comparator);
    }
  }

  includes(item) {
    return this.items.includes(item);
  }

  delete(item) {
    const index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}

function defaultComparator(a, b) {
  return a > b ? -1 : 1;
}

function binaryInsert(value, array, comparator, start = 0, end = array.length - 1) {
  const median = start + Math.floor((end - start) / 2);

  if (array.length === 0) {
    array.push(value);
    return array;
  }

  if (comparator(value, array[start]) < 0) {
    array.splice(start, 0, value);
    return array;
  }

  if (comparator(value, array[end]) > 0) {
    array.splice(end + 1, 0, value);
    return array;
  }

  if (comparator(value, array[median]) < 0) {
    return binaryInsert(value, array, comparator, start, median - 1);
  }

  return binaryInsert(value, array, comparator, median + 1, end);
}
