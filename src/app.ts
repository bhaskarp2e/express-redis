import express, { Request, Response } from 'express';
import { createClient } from 'redis';
import { redisInst} from "../config/redis";
import { connect, Channel } from 'amqplib/callback_api';


const app = express();
const port = 4002;
global.redisClient = redisInst;
// const newRedisConn = new redisClientConnection();



app.get('/', async(req: Request, res: Response) => {
   await redisInst.setKey('keyone','valueone');
   await redisInst.getKey('keyone');
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  // connectRabbitMQ()

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
  connect('amqp://localhost:4003', (err, connection) => {
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
      channel.consume(
        queueName,
        (message) => {
          console.log(`Received message: ${message.content.toString()}`);
        },
        { noAck: true }
      );

      // Send a message to the queue
      const message = 'Hello, world!';
      channel.sendToQueue(queueName, Buffer.from(message));
    });
  });
};








