import {HashMap} from './hashmap';

const test = new HashMap() // or HashMap() if using a factory
console.log(test.hash('appleereererer'));

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test);

/* After populating your hash map with the data above, your hash map’s actual 
capacity should now be at 0.75 (full capacity).

Now with a full hash map, try overwriting a few nodes using set(key, value). 
By right, this should only over-write the existing values of your nodes and not add new ones.

After that, populate your hash map with the last node below 
(doing this will make your hash map exceed your current load factor, 
hence expanding your buckets and growing your hash map):
 */
 test.set('moon', 'silver')
/* If you have implemented your hash map correctly, the capacity of your 
new hash map will drop well below your load factor and you will notice that 
the nodes in your hash map are spread much evenly among your buckets.

With your new hash map, try overwriting a few nodes using set(key, value). 
Again, this should only over-write existing values of your nodes.

Test the other methods of your hash maps such as 
get(key), has(key), remove(key), length(), clear(), keys(), values(), and entries() 
to check if they are still working as expected after expanding your hash map. */