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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("../config/redis");
const callback_api_1 = require("amqplib/callback_api");
const app = (0, express_1.default)();
const port = 4002;
global.redisClient = redis_1.redisInst;
// const newRedisConn = new redisClientConnection();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.redisInst.setKey('keyone', 'valueone');
    yield redis_1.redisInst.getKey('keyone');
    res.send('Hello World!');
}));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    connectRabbitMQ();
});
// const client = createClient();
// const client = createClient({
//   socket:{
//   host: redisUrl,
//   port: 6379,
// // ,
// // password: 'pass123',
// }
// }
// ,
// );
// async function redisConnection(){
// client.on('error', err => console.log('Redis Client Error', err));
// await client.connect();
// await client.set('keyone', '12345');
// await client.setEx('keysec',10,"{val:'12345'}")
// const value = await client.get('keyone');
// console.log("CheckVal",value);
// await client.disconnect();
// }
const connectRabbitMQ = () => {
    (0, callback_api_1.connect)('amqp://localhost:4003', (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }
            // Create a queue for receiving messages
            const queueName = 'exampleQueue';
            channel.assertQueue(queueName, { durable: false });
            // Listen for messages on the queue
            channel.consume(queueName, (message) => {
                console.log(`Received message: ${message.content.toString()}`);
            }, { noAck: true });
            // Send a message to the queue
            const message = 'Hello, world!';
            channel.sendToQueue(queueName, Buffer.from(message));
        });
    });
};
