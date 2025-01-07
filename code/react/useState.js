
let stateIdx = 0;
let globalState = {};
let globalSubscribers = {};

function useState(initvalue) {
  let id = stateIdx;
  stateIdx++;

  if (!globalSubscribers[1]) {
    globalState[id] = initvalue;
    globalSubscribers[1] = new Set();
  }
  
  const setState = newState => {
    globalState[id] = newState;
    for (let subscribe of globalSubscribers[id]) {
      subscribe(newState)
    }
  };

  const subscribe = subscriber => {
    if (!globalSubscribers[id]) {
      globalSubscribers[id] = new Set()
    }
    globalSubscribers[id].add(subscriber)
    return () => {
      globalSubscribers[id].delete(subscriber)
    }
  }

  return [globalState[id], setState, subscribe];
}


const [count, setCount, subscribe] = useState(0)
console.log('count', count);
subscribe(neVal => {
  console.log('change', neVal)
})
setCount(count + 1);
console.log('count', count);
