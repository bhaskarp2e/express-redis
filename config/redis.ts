import { createClient } from 'redis';

//redis client
// let redisClient: any;

let redisClient;


const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
  // ,
  // password: 'pass123',
});

let redisInst = (function () {

  if (redisClient) {
    console.log("can't inititate redis connection")
    throw new Error("New instance cannot be created!!");
  }


  //set redis connection instance

  async function connectRedis() {

    try {
      await client.connect();
      console.log("redis connected")
      redisClient = client;
      return client;

    } catch (err) {
      console.log("connectRedis", err);
    }
  }

  async function disConnectRedis() {
    await redisClient.disconnect();
    redisClient = null;
    return client;
  }


  // redisInstance = this;


  return {

    setKey: async function (key, val) {

      try {
        if (!redisClient) {
          redisClient = await connectRedis()
        }
        await redisClient.set(key, val);

      } catch (err) {

      }
    },

    getKey: async function (key) {

      try {
        if (!redisClient) {
          console.log("getKeyInstance")
          redisClient = connectRedis();
        }
        const resp = await client.get(key);
        console.log("respKey", key, resp);

      } catch (err) {

      }


    }


  }

}())

export {  redisInst };


