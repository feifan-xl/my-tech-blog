




export function traverser (ast, visitor) {
  //遍历数组，在遍历数组的同时会调用traverseNode来遍历节点
  function traverseArray (array, parent) {
    array.forEach(child => {
      traverseNode(child, parent)
    });
  }
  function traverseNode (node, parent) {
    // 判断访问器中是否有合适处理该节点的函数
    let methods = visitor[node.type];
    // 如果有就执行enter函数，因为此时已经进入这个节点了
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    //接下来就根据node节点类型来处理了
    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node); //如果你是ast的根部，就相当于树根，body中的每一项都是一个分支
        break;
      case 'CallExpression':
        traverseArray(node.params, node); //这个和Program一样处理，但是这里是为了遍历params,上面是为了遍历分支
        break;
      // 字符串和数字没有子节点需要访问直接跳过
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      // 最后容错处理
      default:
        throw new TypeError(node.type);
    }
    // 当执行到这里时，说明该节点（分支）已经遍历到尽头了，执行exit
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  //我们从ast开始进行节点遍历，因为ast没有父节点所以传入null
  traverseNode(ast, null);
}


export function transformer (ast) {
  // 将要被返回的新的AST
  let newAst = {
    type: 'Program',
    body: [],
  };
  // 这里相当于将在旧的AST上创建一个_content,这个属性就是新AST的body，因为是引用，所以后面可以直接操作就的AST
  ast._context = newAst.body;
  // 用之前创建的访问器来访问这个AST的所有节点
  traverser(ast, {
    // 针对于数字片段的处理
    NumberLiteral: {
      enter (node, parent) {
        // 创建一个新的节点，其实就是创建新AST的节点，这个新节点存在于父节点的body中
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    // 针对于文字片段的处理
    StringLiteral: {
      enter (node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    // 对调用语句的处理
    CallExpression: {
      enter (node, parent) {
        // 在新的AST中如果是调用语句，type是`CallExpression`，同时他还有一个`Identifier`，来标识操作
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.value,
          },
          arguments: [],
        };
        // 在原来的节点上再创建一个新的属性，用于存放参数 这样当子节点修改_context时，会同步到expression.arguments中，这里用的是同一个内存地址
        node._context = expression.arguments;
        // 这里需要判断父节点是否是调用语句，如果不是，那么就使用`ExpressionStatement`将`CallExpression`包裹，因为js中顶层的`CallExpression`是有效语句
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }
        parent._context.push(expression);
      },
    }
  });
  return newAst;
}
