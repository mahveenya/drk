import amqplib from "amqplib";

async function produce() {
  const connection = await amqplib.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();
  const exchange = "fanout_logs";
  const msg = process.argv.slice(2).join(" ") || "Hello World!";

  await channel.assertExchange(exchange, "fanout", { durable: false });
  channel.publish(exchange, "", Buffer.from(`Fanout: ${msg}`));
  console.log("Message sent");
  await channel.close();
  await connection.close();
}

produce();
