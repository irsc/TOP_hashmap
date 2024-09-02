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
    }

    get(key){
      let index = this.hash(key);
      if(index >= 0){
        let existingList = this.buckets[index];
        let indexKey = existingList.findKey(key);
        return existingList.at(indexKey).value[key]
        
      }else{
          return null;
      }
    }

    has(key){
      let bucket = this.buckets[this.hash(key)];
      if(bucket != undefined){
        return bucket.containsKey(key);
      }
      return false;
    }
}