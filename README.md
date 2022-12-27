### 企业信使短信发送
- 仅适用http://www.ytysms.cn所承载的短信发送系统

```typescript
import { random } from 'lodash';
import { LkSms } from 'turbo-lksms';


const lk = new LkSms({
    userId: '1',
    appId: '1234565',
    password: '123456',
    sign: '测试签名'
})

lk.overageQuery().then(res => {
    console.log(`余量查询:`, res)
}).catch(e => {
    console.error(e)
})

lk.setReceiver('1861234****')
    .setMessageContent(`你的验证码是：${random()},10分钟内有效`)
    .send()
    .then(res => {
        console.log(`发送结果:`, res)
    }).catch(e => {
        console.error(e)
    })
```