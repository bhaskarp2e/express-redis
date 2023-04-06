"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisInst = void 0;
const redis_1 = require("redis");
//redis client
// let redisClient: any;
let redisClient;
const client = (0, redis_1.createClient)({
    socket: {
        host: 'localhost',
        port: 6379
    }
    // ,
    // password: 'pass123',
});
let redisInst = (function () {
    if (redisClient) {
        console.log("can't inititate redis connection");
        throw new Error("New instance cannot be created!!");
    }
    //set redis connection instance
    function connectRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                console.log("redis connected");
                redisClient = client;
                return client;
            }
            catch (err) {
                console.log("connectRedis", err);
            }
        });
    }
    function disConnectRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            yield redisClient.disconnect();
            redisClient = null;
            return client;
        });
    }
    // redisInstance = this;
    return {
        setKey: function (key, val) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!redisClient) {
                        redisClient = yield connectRedis();
                    }
                    yield redisClient.set(key, val);
                }
                catch (err) {
                }
            });
        },
        getKey: function (key) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!redisClient) {
                        console.log("getKeyInstance");
                        redisClient = connectRedis();
                    }
                    const resp = yield client.get(key);
                    console.log("respKey", key, resp);
                }
                catch (err) {
                }
            });
        }
    };
}());
exports.redisInst = redisInst;
