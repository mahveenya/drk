import amqplib from "amqplib";

async function produce() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const exchange = "topic_logs";
  const args = process.argv.slice(2);
  const msg = args.slice(1).join(" ") || "Hello World!";
  const routingKey = args.length > 0 ? args[0] : "anonymous.info";

  await channel.assertExchange(exchange, "topic", { durable: false });
  channel.publish(exchange, routingKey, Buffer.from(`Topic: ${msg}`));
  console.log("Message sent");
  await channel.close();
  await connection.close();
}

produce();
