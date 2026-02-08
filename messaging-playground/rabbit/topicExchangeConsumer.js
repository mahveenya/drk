import amqplib from "amqplib";

const severityPatterns = ["kern.*", "*.critical", "auth.#"];

async function consume() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const exchange = "topic_logs";

  await channel.assertExchange(exchange, "topic", { durable: false });
  const queue = await channel.assertQueue("", { exclusive: true });
  await Promise.all(
    severityPatterns.map((severityPattern) =>
      channel.bindQueue(queue.queue, exchange, severityPattern),
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
