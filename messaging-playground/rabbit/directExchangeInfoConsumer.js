import amqplib from "amqplib";

const log_severity = ["info", "debug"];

async function consume() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const exchange = "direct_logs";

  await channel.assertExchange(exchange, "direct", { durable: false });
  const queue = await channel.assertQueue("", { exclusive: true });
  await Promise.all(
    log_severity.map((severity) =>
      channel.bindQueue(queue.queue, exchange, severity),
    ),
  );
  console.log("Waiting for messages...");
  channel.consume(queue.queue, (msg) => {
    if (msg) {
      console.log("Received:", msg.content.toString());
      channel.ack(msg);
    }
  });
}

consume();
