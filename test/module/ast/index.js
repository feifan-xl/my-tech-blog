

import { tokenizer } from './tokenizer.js';
import { parser } from './parser.js';
import { transformer } from './transformer.js';
import { codeGenerator } from './codeGenerator.js';




function compiler(input) {
  let tokens = tokenizer(input); //生成tokens
  let ast    = parser(tokens); //生成ast
  let newAst = transformer(ast); //拿到新的ast
  let output = codeGenerator(newAst); //生成新代码
  return output;
}

const input = "(add 2 (substract 4 2 ))"
console.log(compiler(input))