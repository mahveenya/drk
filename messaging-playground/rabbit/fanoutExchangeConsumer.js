import amqplib from "amqplib";

async function consume() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const exchange = "fanout_logs";

  await channel.assertExchange(exchange, "fanout", { durable: false });
  const queue = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(queue.queue, exchange, "");
  console.log("Waiting for messages...");
  channel.consume(queue.queue, (msg) => {
    if (msg) {
      console.log("Received:", msg.content.toString());
      channel.ack(msg);
    }
  });
}

consume();
