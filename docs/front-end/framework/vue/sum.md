






### 异步更新

优化， 同一个watcher 被多次触发， 在推入队列时 会进行优化， 尽保留最后一次 



### 生命周期

1. create  vue3被 setup 取代
2. mounted
3. update
4. destory



### pinia

全新状态管理库:
- 移除mutations, 
- 只有 store 概念， 并支持多个store


### v-if v-for

优先级
- vue3 v-if 大于 v-for  
- vue2 v-if 小于 v-for 先遍历后判断

### nextTick

Promise.resolve > MutationObserver > setImmediate > setTimeout


### Vnode

是一层对真实node的抽象, 使用js对象来描述dom