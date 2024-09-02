import { LinkedList } from './linkedList';

export class HashMap {
    constructor(arraySize = 16, loadfactor = 0.75){
        this.buckets = Array.apply(null, Array(arraySize)).map(function () { });
        this.capacity = this.buckets.length;
        this.loadFactor = loadfactor;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        const bucketsLength = this.buckets.length;

        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % bucketsLength;
      } 
    // Takes two arguments, the first is a key and the second is a value that is assigned to this key. 
    // If a key already exists, then the old value is overwritten or we can say that we update the key’s value
    set(key, value){
          let index = this.hash(key);
          let activeBucket = this.buckets[index];
         
          if(this.has(key)){
            activeBucket.updateValue(key, value);
            console.log(`key exists in bucket ${index}, node value replaced`);
          }else if(activeBucket){
              activeBucket.append({[key]:value});
              console.log(`collision in bucket ${index}, node appended to list`);
          }else{
              let newList = new LinkedList();
              newList.append({[key]:value});
              this.buckets[index] = newList;
          }
          this.checkBucketGrowth();
    }

    checkBucketGrowth(){
        let entries = this.entries();
        let numberOfEntries = entries.length;
        if(this.capacity*this.loadFactor < numberOfEntries){
            this.capacity = this.capacity * 2;
            this.buckets = Array.apply(null, Array(this.capacity)).map(function () { });
            entries.forEach(node => {
                this.set(node[0], node[1]);
            });
            console.log("Number of entries requires the number of buckets to grow. Buckets have been doubled.")
      }
    }

    // Takes one argument as a key and returns the value that is assigned to this key. 
    //If a key is not found, return null.
    get(key){
        let index = this.hash(key);
        let existingList = this.buckets[index];
        if(index >= 0 && existingList != undefined){
            let indexKey = existingList.findKey(key);
            return existingList.at(indexKey).value[key];
          
        }else{
            return null;
        }
    }

    //Takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(key){
        let bucket = this.buckets[this.hash(key)];
        if(bucket != undefined){
          return bucket.containsKey(key);
        }
        return false;
    }
    // Takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. 
    // If the key isn’t in the hash map, it should return false.
    remove(key){
      if(this.has(key)){
          let existingList = this.buckets[this.hash(key)];
          let indexKey = existingList.findKey(key);
          existingList.removeAt(indexKey);
          if(existingList.getSize() == 0){
            this.buckets[this.hash(key)] = undefined;
          }
          console.log(`Node with key ${key} removed`);
          return true;
      }else{
        return false;
      }
    }
    // Returns the number of stored keys in the hash map.
    length(){
        let numberKeys = 0;
        this.buckets.forEach(bucket => {
            if(bucket != undefined){
                numberKeys += bucket.getSize();
            }
        });
        return numberKeys;
    }
    // Removes all entries in the hash map.
    clear(){
        this.buckets = Array.apply(null, Array(this.capacity)).map(function () { });
    }
    // Returns an array containing all the keys inside the hash map.
    keys(){
        let arrayKeys = [];
        this.buckets.forEach(bucket => {
            if(bucket != undefined){
                arrayKeys = arrayKeys.concat(bucket.getKeys());
            }
        });
        return arrayKeys;
    }
    // Returns an array containing all the values.
    values(){
      let arrayValues = [];
      this.buckets.forEach(bucket => {
          if(bucket != undefined){
              arrayValues = arrayValues.concat(bucket.getValues());
          }
      });
      return arrayValues;
    }
    // Returns an array that contains each key, value pair. 
    //Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries(){
        let entries = [];
        this.buckets.forEach(bucket => {
          if(bucket != undefined){
              entries = entries.concat(bucket.getNode());
          }
      });
        return entries;
    }

    getFillingLevel(){
      return this.length() / this.capacity;
    }

}