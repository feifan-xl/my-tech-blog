









## other

some widget 


### 宏

1. 宏是什么
    - 宏是一种特殊的代码，由编译器处理并转换为对应的功能代码
    - 语法糖 本质是字符串替换形式

2. 为什么不需要import
    - 编译时已经处理， import 是执行阶段
3. 为什么只能 setup 顶层使用
    - 编译时只会传递 setup 顶层，其他层级的不会处理


### setup

1. 什么是setup
    - 仅作用于编译阶段，用于指定编译规则
2. 编译后变成了什么
    - 编译后 会变成 setup 方法, 方法会返回一个对象
    - 返回的对象包括
        - setup中定义的顶层变量
        - import 导入的内容 
    - template 编译后的 render 中 会将变量名更换为 $setup.[var]

3. setup 的全流程
    - 执行 setup 语法糖编译后的 setup 函数
    - 将 setup 函数中由顶层变量和 import 导入组成的返回值对象经过 proxy 处理后赋值给 vue 实例上的 setupState 属性
    - 执行 render 函数时，从 vue 实例的 setupState 属性的值( 完成了 template 对 setup 顶层变量的访问)
4. 为什么 import 的组件不需要显式注册就可以使用
    - setup 编译后的返回值中就有 import 导入的变量，tempalte 可以直接使用 








### setup 解析流程


vite加载时 在遇到 vue 文件时, 会出发 @vitejs/plugin-vue 插件中的 transfrom 函数, 这个函数中 主要调用了 transfromMain 函数
将原有vue文件进行解码， 分别处理 template  script scriptsetup styles 转为为js
将转码后的字符串通过 \n 拼在一次 返回给浏览器

https://vue-compiler.iamouyang.cn/template/patchFlag.html

为什么template 中的ref 不需要 。value
new Proxy 中 get 处理 在 template 中 就是没有.value 的；

