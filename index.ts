/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-27 11:37:26
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-27 12:19:10
 * @FilePath      : /turbo-lksms/index.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
import { random } from 'lodash';
import { LkSms } from './dist';


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