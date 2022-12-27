export interface LkSMSConfig {
    /**
     * 用户ID
     */
    userId: string;
    /**
     * 用户账号
     */
    appId: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 短信签名
     */
    sign: string;
}
interface ApiResponse {
    ReturnStatus: 'Success' | 'Faild';
    Message: string;
    [key: string]: any;
}
interface OverageApiRes extends ApiResponse {
    /**
     * 支付方式
     */
    Payinfo: string;
    /**
     * 余额
     */
    Overage: number;
    /**
     * 总点数  当支付方式为预付费是返回总充值点数
     */
    SendTotal: number;
}
/**
 * 企业信使短信发送
 */
export declare class LkSms {
    private Uri;
    private userId;
    private appId;
    private passwd;
    private messageSign;
    private message;
    private receivers;
    constructor(config: LkSMSConfig);
    /**
     * 设置接收人
     * @param receiver
     * @returns
     */
    setReceiver(...receiver: string[]): this;
    /**
     * 设置消息内容
     * @param content
     * @returns
     */
    setMessageContent(content: string): this;
    /**
     * 发送短信
     * @returns
     */
    send(): Promise<boolean>;
    /**
     * 余额以及已发数量查询
     * @param data
     * @returns
     */
    overageQuery(): Promise<OverageApiRes>;
    request(data: Record<string, any>): Promise<any>;
}
export {};
