import { connect, Channel } from 'amqplib/callback_api';

let rabbitChannel: any;

const connectRabbitMQ = () => {
    connect('amqp://localhost', (err, connection) => {
      if (err) {
        throw err;
      }
  
      connection.createChannel((err, channel) => {
        if (err) {
          throw err;
        }

        console.log("rabbitmq connected")
        rabbitChannel = channel
  
        // Create a queue for receiving messages
        const queueName = 'exampleQueue';
        rabbitChannel.assertQueue(queueName, { durable: false });
  
        // Listen for messages on the queue
        rabbitChannel.consume(
          queueName,
          async(message) => {
            console.log(`Received message from ${queueName} : ${message.content.toString()}`);
          },
          { noAck: true }
        );
  
        // Send a message to the queue
        // const message = 'Hello, world!';
        // rabbitChannel.sendToQueue(queueName, Buffer.from(message));
      });
    });
}

const queueOne = async(queueName,message)=>{

    
    rabbitChannel.sendToQueue(queueName, Buffer.from(message));
} 

export { connectRabbitMQ, queueOne};

