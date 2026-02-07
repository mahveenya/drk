import amqplib from "amqplib";

async function produce() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const queue = "test_queue";

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from("Hello from Node!"));
  console.log("Message sent");
  await channel.close();
  await connection.close();
}

produce();
