

## 依赖收集 动态计算流程

1. data 属性初始化 getter setter
2. computed 计算属性初始化,提供的函数将用作属性 vm.reversedMessage 的 getter
3. 当首次获取 reversedMessage 计算属性的值时, Dep开始收集依赖
4. 当执行 message getter 方法时, 如果 Dep 处于依赖收集状态，则判定 message 为 reversedMessage 的依赖,并建立依赖关系
5. 当 message 发生变化时,根据依赖关系,触发 reverseMessage 的重新计算


计算属性是一个新的属性，在初始化时收集依赖，并将值缓存后挂载到vm上, 在依赖有变化时会触发相应的变化


### watch vs computed

computed 需要一个自定义的侦听器，watcher 是监听

1. computed是计算一个新的属性,并将该属性挂在到vm上, 而 watcher 是监听已经存在且已挂载到vm上的数据,可以是data props computed
2. 在数据变化时执行异步或开销较大的操作时,watch比较有用，watch 可以限制执行异步操作或高消耗新能的操作，并在得到最终结果前 设置中间状态
3. computed 本质时一个惰性求值的观察者，有缓存性，只有依赖变化后，第一次访问才会计算新值
4. 场景上讲， computed 适用一个数据被多数据影响，watch 始用一个数据影响多数据



### 使用场景  
computed：需要处理复杂逻辑的模板表达式。
watch：需要执行异步或开销较大的操作。



