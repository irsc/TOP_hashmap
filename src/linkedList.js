export class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    // append(value) adds a new node containing value to the end of the list
    append(value){
        let node = new Node(value)
        if(this.head == null){
            this.head = node;
        }else{
            this.tail(this.head).nextNode = node;
        }
        this.size++;
    }
    //prepend(value) adds a new node containing value to the start of the list
    prepend(value){
        let node = new Node(value)
        if(this.head == null){
            this.head = node;
        }else{
            node.value = value;
            node.nextNode = this.head;
            this.head = node;
        }
        this.size++;
    }
    //size returns the total number of nodes in the list
    getSize(){
        return this.size;
    }
    //head returns the first node in the list
    getHead(){
        return this.head;
    }
    //tail returns the last node in the list
    tail(node = null){
        if(node == null){
            node = this.getHead();
        }
        if(node.nextNode == null){
            return node;
        }
        return this.tail(node.nextNode);
    }
    //at(index) returns the node at the given index
    at(index){
        let node = this.getHead();
        if(index < this.getSize()){
            for (let i = 0; i < index; i++) {
                node = node.nextNode;
            }
            return node;
        }else{
            return null;
        }
    }
    //pop removes the last element from the list

    pop(){
        if(this.getSize() == 1){
            this.size = 0;
            return this.head = null;
        }else{
            let node = this.at(this.getSize()-2);
            this.size--;
            return node.nextNode = null;
        }
    }
    //contains(value) returns true if the passed in value is in the list and otherwise returns false.
    /* contains(value){
        for (let index = 0; index < this.getSize(); index++) {
            if(this.at(index).value == value){
                return true;
            }
        }
        return false;
    } */
    containsKey(key){
        for (let index = 0; index < this.getSize(); index++) {
            if(this.at(index).value[key] != undefined){
                return true;
            }
        }
        return false;
    }
    //find(value) returns the index of the node containing value, or null if not found.
   /*  find(value){
        for (let index = 0; index < this.getSize(); index++) {
            if(this.at(index).value == value){
                return index;
            }
        }
        return null;
    } */
    findKey(key){
        for (let index = 0; index < this.getSize(); index++) {
            if(Object.keys(this.at(index).value) == key){
                return index;
            }
        }
        return null;
    }
    //toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString(node = null){
        if(node ==  null){
            node = this.head;
        }
        if(this.head == null){
            return "null";
        }
        if(node.nextNode == null){
            return `(${node.value}) -> null`;
        }
        return `(${node.value}) -> ` + this.toString(node.nextNode);
    }

    //insertAt(value, index) that inserts a new node with the provided value at the given index.
    insertAt(value, index){
        if(index == 0){
            return this.prepend(value);
        }else if(index < this.getSize()){
            let nodeAtIndex =  this.at(index);
            let nodeBeforeIndex = this.at(index-1);
            let newNode = new Node(value, nodeAtIndex);
            nodeBeforeIndex.nextNode = newNode;
            this.size++;
        }else{
            return null;
        }
        
    }
    //removeAt(index) that removes the node at the given index.
    removeAt(index){
        if(index == this.getSize()-1){
            return this.pop();
        }else if(index == 0){
            let nodeAtIndex =  this.at(index);
            let nodeAfterIndex =  this.at(index+1);
            nodeAtIndex = null;
            this.head = nodeAfterIndex;
            this.size--;
        }else if(index < this.getSize()){
            let nodeAtIndex =  this.at(index);
            let nodeAfterIndex =  this.at(index+1);
            let nodeBeforeIndex = this.at(index-1);
            nodeAtIndex = null;
            nodeBeforeIndex.nextNode = nodeAfterIndex;
            this.size--;
        }else{
            return null;
        }
        
    }

    updateValue(key, value){
        let index = this.findKey(key);
        if(index>=0){
            let nodeAtIndex =  this.at(index);
            nodeAtIndex.value = {[key]:value};
        }else{
            return null;
        }
    }

    getKeys(){
        let arrayKeys = [];
        for (let index = 0; index < this.getSize(); index++) {
            arrayKeys.push(Object.keys(this.at(index).value));
        }
        return arrayKeys;
    }

    getValues(){
        let arrayValues = [];
        for (let index = 0; index < this.getSize(); index++) {
            arrayValues.push(Object.values(this.at(index).value));
        }
        return arrayValues;
    }
}

class Node{
    constructor(value = null, nextNode = null){
        this.value = value;
        this.nextNode = nextNode;
    }
}
