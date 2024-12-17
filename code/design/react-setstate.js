
let stateIdx = 0;
let globalState = {};
let globalSubscribers = {};

function useState(initvalue) {
  let id = stateIdx;
  stateIdx++;

  if (!globalSubscribers[idx]) {
    globalState[idx] = initvalue;
    globalSubscribers[idx] = new Set();
  }
  
  const setState = newState => {
    globalState[id] = newState;
    for (let subscribe of globalSubscribers[id]) {
      subscribe(newState)
    }
  };

  const subscribe = subscriber => {
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
setCount(0);
console.log('count', count);

s