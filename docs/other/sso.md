


sso，一种身份认证解决方案，通过一次性用户验证 登录多个应用，  


使用jwt
- header
- payload 
- signature

认证流程:
生成: 秘钥 + payload -> 签名 -> base64加密
认证: base64解密 -> 秘钥 + payload == 签名


jwt无状态， jwt的失效 需要后端 或者redis相关的
