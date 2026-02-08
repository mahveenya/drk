import amqplib from "amqplib";

async function produce() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const exchange = "direct_logs";
  const args = process.argv.slice(2);
  const msg = args.slice(1).join(" ") || "Hello World!";
  const severity = args.length > 0 ? args[0] : "info";

  await channel.assertExchange(exchange, "direct", { durable: false });
  channel.publish(exchange, severity, Buffer.from(`Direct: ${msg}`));
  console.log("Message sent");
  await channel.close();
  await connection.close();
}

produce();
