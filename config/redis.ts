import { createClient } from 'redis';

//redis client
let redisClient:any;

const client = createClient({
  socket:{
      host: 'localhost',
      port: 6379
  }
    // ,
    // password: 'pass123',
  });

async function redisClientConnection(){

client.on('error', err => console.log('Redis Client Error', err));



await client.connect();

redisClient = client;

await client.set('keyone', 'value');
const value = await client.get('keyone');
console.log("CheckVal",value);
// await client.disconnect();
}

export {redisClientConnection, redisClient};


