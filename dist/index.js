"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LkSms = void 0;
var _ = __importStar(require("lodash"));
var crypto_js_1 = require("crypto-js");
var moment_1 = __importDefault(require("moment"));
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
/**
 * 企业信使短信发送
 */
var LkSms = /** @class */ (function () {
    function LkSms(config) {
        this.Uri = "http://47.93.25.215:8088/v2sms.aspx";
        this.userId = "";
        this.appId = "";
        this.passwd = "";
        this.messageSign = "";
        this.message = "";
        this.receivers = [];
        this.userId = config.userId;
        this.appId = config.appId;
        this.passwd = config.password;
        this.messageSign = "".concat(config.sign.replace(/\【|\】/g, ''));
    }
    /**
     * 设置接收人
     * @param receiver
     * @returns
     */
    LkSms.prototype.setReceiver = function () {
        var receiver = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            receiver[_i] = arguments[_i];
        }
        this.receivers = _.uniq(receiver.concat(this.receivers));
        return this;
    };
    /**
     * 设置消息内容
     * @param content
     * @returns
     */
    LkSms.prototype.setMessageContent = function (content) {
        this.message = content;
        return this;
    };
    /**
     * 发送短信
     * @returns
     */
    LkSms.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (_.isEmpty(this.receivers) || this.receivers.length < 1) {
                            throw new Error("接收人为空");
                        }
                        if (_.isEmpty(this.message)) {
                            throw new Error("消息内容为空");
                        }
                        return [4 /*yield*/, this.request({
                                mobile: this.receivers.join(","),
                                content: this.message + "".concat(this.messageSign ? "\u3010".concat(this.messageSign, "\u3011") : ""),
                                sendTime: '',
                                action: 'send',
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res && res.ReturnStatus === 'Success'];
                }
            });
        });
    };
    /**
     * 余额以及已发数量查询
     * @param data
     * @returns
     */
    LkSms.prototype.overageQuery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            action: 'overage',
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    LkSms.prototype.request = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var timeStamp, body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeStamp = (0, moment_1.default)().utcOffset("+08").format('YYYYMMDDHHmmss');
                        body = __assign(__assign({}, data), { userid: this.userId, timestamp: timeStamp, sign: (0, crypto_js_1.MD5)("".concat(this.appId).concat(this.passwd).concat(timeStamp)).toString(), rt: 'json' });
                        return [4 /*yield*/, (0, axios_1.default)({
                                url: this.Uri + "?".concat(qs_1.default.stringify(body)),
                                method: 'POST',
                                data: body,
                                headers: {
                                    'useragent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.98 Safari/537.36'
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    return LkSms;
}());
exports.LkSms = LkSms;
//# sourceMappingURL=index.js.map