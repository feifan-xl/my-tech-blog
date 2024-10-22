


## sso

SSO 是一种身份验证机制  
多系统应用群中登录一个系统，遍在其他系统中的得到授权并无需再次登录




## jwt

json web token: 一种授权方式 

本质: 对 json 数据进行签名后进行传递，以达到安全可靠的目的


### 组成

- header jwt 元数据 签名算法
- payload 实际存放的数据
- singature 签名 (由 header payload 使用 secret 加密 )
  ```js
  SHA256(
    base64UrlEncode(header) + '.'
    + base64UrlEncode(payload),
    secret
  )
  // header jwt 元数据 签名算法
  // payload 实际存放的数据
  // secret 加密使用的密码
  ```

### 优势

1. 更少的数据库连接 
2. 无状态
3. 跨服务 语言，可以在分布式系统中，解决单点登录问题


### 注意项

1. 严重依赖密钥
2. 存放数据过多可能占用带宽
3. 默认不加密，需注意敏感信息
4. 减少盗用，避免token被劫持， 应使用https协议 



