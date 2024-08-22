

## iterator
迭代器模式提供一种顺序访问集合元素的方法  
而无需暴露集合的内部表示  
适用于需要遍历集合的场景

```
class Iterator {
    constructor(items) {
        this.items = items;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.items.length;
    }

    next() {
        return this.items[this.index++];
    }
}

const iterator = new Iterator(["item1", "item2", "item3"]);
while (iterator.hasNext()) {
    console.log(iterator.next());
}

```