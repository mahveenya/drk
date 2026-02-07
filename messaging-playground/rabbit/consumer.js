import amqplib from "amqplib";

async function consume() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const queue = "test_queue";

  await channel.assertQueue(queue);
  console.log("Waiting for messages...");
  channel.consume(queue, (msg) => {
    if (msg) {
      console.log("Received:", msg.content.toString());
      channel.ack(msg);
    }
  });
}

consume();
