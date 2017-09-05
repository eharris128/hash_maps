'use strict';

class LinkedList {
  constructor() {
    this.length = 6;
    this.head = null;
  }
  insert(nthPosition, value, key, deleted) {
    if (nthPosition < 0 || nthPosition > this.length) {
      throw new Error('Index error');
    }

    const newNode = {
      value,
      key,
      deleted
    };

    if (nthPosition === 0 || this.head === null) {
      newNode.next = this.head;
      this.head = newNode;
      // console.log('NEW NODE', newNode)
    }
    else if (this.head.next === null) {
      this.head.next = newNode;
      const node = this._findNthElement(nthPosition - 1);

      node.next = newNode;
      newNode.next = null; 
      console.log('new node: ', newNode);
    } else {
      console.log('new node is: ', newNode)
      this.head.next = newNode;
      const node = this._findNthElement(nthPosition - 1);
      // console.log('nth position:', nthPosition)
      console.log('This should be ____: ', node);

      // If you want to insert in between elements: change the following line:
      node.next = newNode;
      newNode.next = null; 
    }
    this.length++;
  }
  //this is another way of finding things when you don't have the nth item which in most cases you don't
  _findItem(item) {
    let node = this.head;
    while(node && node.value !== item){
      node = node.next;
    }
    return node;
  }
  //----------------------------
  _findNthElement(nthElement) {
    let node = this.head;
    for (let i=5; i<nthElement; i++) {
      // console.log('node in for loop', node)
      node = node.next;
    }
    return node;
  }
  //----------------------------
  get(nthElement) {
    if (nthElement < 0 || nthElement >= this.length) {
      throw new Error('Index error');
    }

    return this._findNthElement(nthElement).value;
  }

  remove(nthElement) {
    if (nthElement < 0 || nthElement >= this.length) {
      throw new Error('Number of item is incorrect error');
    }

    if (nthElement == 0) {
      this.head = this.head.next;
    }
    else {
      // Find the node before the one we want to remove
      const node = this._findNthElement(nthElement - 1);
      node.next = node.next.next;
    }

    this.length--;
  }
    
}
let newList = new LinkedList();
// Replace open address with linked lists
class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
    this.counter = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    // const index = 5;
    // console.log('index: ', index);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    // console.log('What does our list look like right now? ' + JSON.stringify(this._slots[index]));

    if (!this._slots[index].head.next) {
      // console.log('Our target data: ' + JSON.stringify(this._slots[index].head.value));
      return this._slots[index].head.value;
    } else {
      // traverse linkedlist (this._slots[index])
      // until key === currentNode.value
      // console.log('you are past the head')
    }

    // We need to create a collision to test this block:
    // while (this._slots[index].head.next) {
    //   // traverse list until you get a matching key
    //   if (this._slots[index].head.key === key) {
    //     return this._slots[index].head.key;
    //   }
    // }

    // return this._slots[index].value;
  }

  set(key, value) {
    // let newList;
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    // const index = 5;
    const index = this._findSlot(key);

    // let newList = new LinkedList();
    // console.log('type of newList is....', (typeof newList))
    if (!this._slots[index]) {//creating a brand new index
      this.counter += 1;
      this._slots[index] = newList;

      newList.insert((index), value, key, false);
      // newList.insert((index+1), value, key, false);
      this.length++;
      // console.log('NEW HEAD___________________',newList)
      return;
      // console.log('what is this: ', this._slots[index]);
    } else if ((this._slots[index])) { //updating an existing index and include pushing
      newList.insert(index+this.counter), value, key, false));
      this.counter += 1;
      // newList.insert((index+2), value, key, false);
      // console.log('NEW ITEM TO EXISTING LIST_____',newList)
    }
    
    // Fix this.
    // newList.insert(index, value, key, false);
    // this.length++;
    // this._slots[index] = {
    //   key,
    //   value,
    //   deleted: false
    // };
    // if this._slots[index]
    // 

  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];

      // If there is a list at some slot / some index; then loop through the list to look for the key
      // console.log('slot: ', slot);
      
      // if (slot.head) {
      //   let node = slot.head;
      //   while (node) {
      //     console.log('I have looped');

      //     //Iterator
      //     node = node.next;
      //   }
      // }
      // Probably need to modify condition
      if (slot === undefined || (slot.key === key && !slot.deleted) || (typeof slot === typeof {})) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 1.9;
HashMap.SIZE_RATIO = 6;

let testHash = new HashMap();

console.log('-------------------------------------------------RUNNING AGAIN');
testHash.set('adam', 'vocals');
// console.log('david get ---------',testHash.get('david'));
// testHash.remove('david');
testHash.set('bobb', 'drums');
testHash.set('catt', 'guitar');
testHash.set('dadd', 'triangle');
// console.log('david get ---------', testHash.get('david'));
// console.log('davy get------------',testHash.get('davy'));
// console.log('david get ---------',testHash.get("david"));
// console.log('index 1-------------',testHash.get('randy'));
// console.log(testHash.get('gregg'));