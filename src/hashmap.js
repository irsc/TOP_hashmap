import { LinkedList } from './linkedList';

export class HashMap {
    constructor(){
        this.buckets = Array.apply(null, Array(16)).map(function () { });
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        const bucketsLength = this.buckets.length;

        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketsLength;
        }
        return hashCode;
      } 

    set(key, value){
          let index = this.hash(key);
          let existingList = this.buckets[index];
          if(this.has(key)){
            existingList.updateValue(key, value)
            console.log("key exists, replace value");
          }else if(existingList){
              existingList.append(`{${key}:${value}}`);
              this.buckets[index] = existingList;
          }else{
              let newList = new LinkedList();
              newList.append(`{${key}:${value}}`);
              this.buckets[index] = newList;
          }
    }

    get(key){
      let index = this.hash(key);
      if(index){
        let existingList = this.buckets[index];
        let indexKey = existingList.findKey(key);
        return existingList.at(indexKey).value[key]
        
      }else{
          return null;
      }

    }

    has(key){
      let bucket = this.buckets[this.hash(key)];
      if(bucket){
        return bucket.containsKey(key);
      }
      return false;
    }
}