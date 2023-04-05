import express, { Request, Response } from 'express';
import { createClient } from 'redis';
import {redisClientConnection, redisClient} from "../config/redis";

const app = express();
const port = 4002;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  
  //calling redis connection
  // redisConnection();
  redisClientConnection()
});


const redisUrl = `127.0.0.1`

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

setTimeout(()=>{

  redisClient.set('key3',"valthree")
},5000)







