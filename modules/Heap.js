export default class Heap {
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
    const index = this.items.length;
    this.items.unshift(item);
    siftDown(this.items, 0, index, this.comparator);
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
  return a - b;
}

function siftDown(array, start, end, compare) {
	let root = start;

	while (root * 2 + 1 <= end) {
		const lChild = root * 2 + 1;
		const rChild = lChild + 1;
		let current = root;

		if (compare(array[current], array[lChild]) < 0) {
			current = lChild;
		}

		if (rChild <= end && compare(array[current], array[rChild]) < 0) {
			current = rChild;
		}

		if (current === root) {
			return;
		}

		swap(array, root, current);
		root = current;
	}
}

function swap(array, indexA, indexB) {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}
