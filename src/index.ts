/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-27 11:17:52
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-27 12:20:03
 * @FilePath      : /turbo-lksms/src/index.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */

import * as _ from 'lodash';
import { MD5 } from 'crypto-js';
import moment from "moment";
import axios, { AxiosResponse } from "axios";
import QueryString from "qs";

export interface LkSMSConfig {
    /**
     * 用户ID
     */
    userId: string
    /**
     * 用户账号
     */
    appId: string
    /**
     * 密码
     */
    password: string
    /**
     * 短信签名
     */
    sign: string
}

interface ApiResponse {
    ReturnStatus: 'Success' | 'Faild',
    Message: string,
    [key: string]: any
}

interface SendSmsApiRes extends ApiResponse {
    /**
     * 剩余短信量
     */
    RemainPoint: number,
    /**
     * 发送任务ID
     */
    TaskID: number,
    /**
     * 发送成功数量
     */
    SuccessCounts: number
}

interface OverageApiRes extends ApiResponse {
    /**
     * 支付方式
     */
    Payinfo: string,
    /**
     * 余额
     */
    Overage: number,
    /**
     * 总点数  当支付方式为预付费是返回总充值点数
     */
    SendTotal: number
}

/**
 * 企业信使短信发送
 */
export class LkSms {

    private Uri = "http://47.93.25.215:8088/v2sms.aspx";

    private userId: string = "";

    private appId: string = "";

    private passwd: string = "";

    private messageSign: string = "";

    private message: string = "";

    private receivers: string[] = [];

    constructor(config: LkSMSConfig) {
        this.userId = config.userId;
        this.appId = config.appId;
        this.passwd = config.password;
        this.messageSign = `${config.sign.replace(/\【|\】/g, '')}`;
    }

    /**
     * 设置接收人
     * @param receiver
     * @returns 
     */
    setReceiver(...receiver: string[]) {
        this.receivers = _.uniq(receiver.concat(this.receivers))
        return this
    }

    /**
     * 设置消息内容
     * @param content 
     * @returns 
     */
    setMessageContent(content: string) {
        this.message = content
        return this
    }

    /**
     * 发送短信
     * @returns 
     */
    async send() {
        if (_.isEmpty(this.receivers) || this.receivers.length < 1) {
            throw new Error("接收人为空");
        }
        if (_.isEmpty(this.message)) {
            throw new Error("消息内容为空");
        }

        const res: SendSmsApiRes = await this.request({
            mobile: this.receivers.join(","),
            content: this.message + `${this.messageSign ? `【${this.messageSign}】` : ``}`,
            sendTime: '',
            action: 'send',
        })
        return res && res.ReturnStatus === 'Success'
    }

    /**
     * 余额以及已发数量查询
     * @param data 
     * @returns 
     */
    async overageQuery() {
        const res: OverageApiRes = await this.request({
            action: 'overage',
        })
        return res
    }

    async request(data: Record<string, any>): Promise<any> {

        const timeStamp = moment().utcOffset("+08").format('YYYYMMDDHHmmss')

        const body = {
            ...data,
            userid: this.userId,
            timestamp: timeStamp,
            sign: MD5(`${this.appId}${this.passwd}${timeStamp}`).toString(),
            rt: 'json',
        }

        const res: AxiosResponse<ApiResponse> = await axios({
            url: this.Uri + `?${QueryString.stringify(body)}`,
            method: 'POST',
            data: body,
            headers: {
                'useragent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.98 Safari/537.36'
            }
        })

        return res.data
    }
}