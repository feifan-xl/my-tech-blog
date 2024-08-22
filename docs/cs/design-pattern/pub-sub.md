
## pub-sub



### code
```
class PubSub {
    constructor() {
        this.topics = {};
    }

    subscribe(topic, listener) {
        // 如果该主题不存在，则创建一个新的列表
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        // 将监听器添加到主题列表中
        this.topics[topic].push(listener);
    }

    publish(topic, data) {
        // 如果该主题不存在，或者没有监听器，直接返回
        if (!this.topics[topic] || this.topics[topic].length === 0) {
            return;
        }

        // 否则，遍历该主题的监听器，并调用它们
        this.topics[topic].forEach(listener => listener(data));
    }

    unsubscribe(topic, listenerToRemove) {
        if (!this.topics[topic]) return;

        this.topics[topic] = this.topics[topic].filter(listener => listener !== listenerToRemove);
    }
}

// 创建一个PubSub实例
const pubsub = new PubSub();

// 定义一些订阅者
const subscriber1 = data => console.log(`Subscriber 1 received: ${data}`);
const subscriber2 = data => console.log(`Subscriber 2 received: ${data}`);

// 订阅某个主题
pubsub.subscribe("topic1", subscriber1);
pubsub.subscribe("topic1", subscriber2);

// 发布消息
pubsub.publish("topic1", "Hello, world!");

// 取消订阅
pubsub.unsubscribe("topic1", subscriber1);

// 发布另一条消息
pubsub.publish("topic1", "Hello again!");

```

### 优点
解耦：发布者和订阅者之间没有直接联系，降低了系统的耦合度。  
灵活性：可以动态地添加或移除订阅者，系统具有更高的扩展性。  
可维护性：因为发布者和订阅者解耦，代码更容易维护和理解。  

### 应用场景

事件驱动架构：前端框架（如React和Vue）中的事件系统。  
消息队列系统：如RabbitMQ和Kafka。  
实时应用：如聊天室、实时数据更新等。  