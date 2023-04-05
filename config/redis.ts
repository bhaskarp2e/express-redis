import { createClient, RedisClientOptions } from 'redis';

const redisUrl = `redis://test:pass12345@localhost:6379`

const client = createClient({
      host: 'localhost',
      port: 6379
    // ,
    // password: 'pass123',
  });

//   const redisUrl = `redis[s]://[[username][:password]@][host][:port][/db-number]`

// const client = createClient({
//     socket:{
//     host: redisUrl,
//     port: 6379
//   // ,
//   // password: 'pass123',
// }
// });

async function redisConnection(){

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('keyone', 'value');
const value = await client.get('key');
// await client.disconnect();
}

export default redisConnection;


