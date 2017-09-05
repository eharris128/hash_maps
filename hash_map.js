'use strict';

class HashMap {
  constructor(initialCapacity=8) {
      this.length = 0;
      this._slots = [];
      this._capacity = initialCapacity;
      this._deleted = 0;
  }

  get(key) {
      const index = this._findSlot(key);
      if (this._slots[index] === undefined) {
          throw new Error('Key error');
      }
      return this._slots[index].value;
  }

  set(key, value) {
      const loadRatio = (this.length + this._deleted + 1) / this._capacity;
      if (loadRatio > HashMap.MAX_LOAD_RATIO) {
          this._resize(this._capacity * HashMap.SIZE_RATIO);
      }

      const index = this._findSlot(key);
      this._slots[index] = {
          key,
          value,
          deleted: false
      };
      this.length++;
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
          
          //case of when there is no collision
          if (slot === undefined || (slot.key == key && !slot.deleted)) {
              return index;
          }

          //case of when there is a collision
            //if(slot !== undefined) {
              //create a node with a .next property that points to most recent slot
              //modify index to make sure that new node is not overwriting the previous value
              //should be possible to traverse and find correct value
              //for possible future collisions the process repeats by grabbing higher nodes
            // }
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

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

let hTable = new HashMap();
let names = [
  { Hobbit: "Bilbo" },
  { Hobbit: "Frodo" },
  { Wizard: "Gandolf" },
  { Human: "Aragon" },
  { Elf: "Legolas" },
  { Maiar: "The Necromancer" },
  { Maiar2: "Sauron" },
  { RingBearer: "Gollum" },
  { LadyOfLight: "Galadriel" },
  { HalfElven: "Arwen" },
  { ShepherdOfTheTrees: "Treebeard" }
];

for (var i = 0; i < names.length; ++i) {
  for (let keys in names[i]) {
    hTable.set(keys, names[i][keys]);
  }
}
hTable.set("Instructor", "Tauhida");
hTable.remove("Instructor");
hTable.set("Instructor2", "Chris");
hTable.set("TA", "Joshua");
console.log(hTable);