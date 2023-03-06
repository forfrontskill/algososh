export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (value: T) => void;
  prepend: (value: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  getSize: () => number;
  print: () => void;
  toArray: () => T[];
  getHead: () => Node<T> | null;
  getTail: () => Node<T> | null;
}

export class LinkedListNode<T> implements ILinkedList<T> {

  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(value: T) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (value) {
      this.append(value);
    }
  }

  getHead = () => this.head;

  getTail = () => this.tail;

  append = (element: T) => {
    const newNode = new Node(element, null);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    this.size++
  }

  prepend = (value: T) => {
    const newNode = new Node(value, null);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }



  tresByIndex = (index: number) => {
    if (index < 0) {
      throw new Error("Position lower zero");
    }

    let counter = 0;
    let curr = this.head;

    while (counter !== index) {
      if (curr)
        curr = curr.next;
      counter++;
    }

    return curr;
  }

  addByIndex = (value: T, position: number) => {
    if (position < 0) {
      throw new Error("Position lower zero");
    }

    if (position >= this.size) {
      return this.append(value);
    }

    if (position === 0) {
      return this.prepend(value);
    }

    const newNode = new Node(value, null);

    const prevIndex = this.tresByIndex(position - 1);
    if (prevIndex) {
      const targetIdx = prevIndex.next;
      prevIndex.next = newNode;
      newNode.next = targetIdx;
    }
    this.size++;
  }

  deleteHead = () => {
    if (!this.head) {
      throw new Error("Head is null");
    }

    const headVal = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
      return headVal;
    }

    const newHead = this.head.next;

    this.head = newHead;
    this.size--;
    return headVal;
  }

  deleteTail = () => {
    if (!this.head) {
      throw new Error("Head is null");
    }

    const tailVal = this.tail?.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
      return tailVal;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    this.size--;
    return tailVal;
  }

  deleteByIndex = (index: number) => {
    if (index < 0) {
      throw new Error("Position lower zero");
    }

    if (this.size === 2) {
      if (index === 0) {
        return this.deleteHead();
      }
      if (index > 0) {
        return this.deleteTail();
      }
    }

    let removalType
    if (index === 0) {
      removalType = 'head';
    } else if (index >= this.size) {
      removalType = 'tail';
    } else {
      removalType = 'middle';
    }

    if (removalType === 'head') {
      return this.deleteHead();
    }

    if (removalType === 'tail') {
      return this.deleteTail();
    }

    if (removalType === 'middle') {
      const preIdx = this.tresByIndex(index - 1);
      const targetIdx = preIdx?.next;
      const targetVal = targetIdx?.value;
      
      if (preIdx)
        preIdx.next = targetIdx ? targetIdx.next : null;
      
        this.size--;
      return targetVal;
    }
  }

  getSize = () => this.size;

  toArray = () => {
    const array = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  print = () => {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

}