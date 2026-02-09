import json
import uuid
from confluent_kafka import Consumer

consumer_config = {
    "bootstrap.servers": "localhost:9092",
    "group.id": "order-consumer",
    "auto.offset.reset": "earliest",
}

consumer = Consumer(consumer_config)

topic = "orders"
consumer.subscribe([topic])

print(f"Subscribed to topic: {topic}")

try:
    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue
        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue

        order_data = json.loads(msg.value().decode("utf-8"))
        print(f"Received order: {order_data}")
except KeyboardInterrupt:
    print("Stopping consumer...")
finally:
    consumer.close()
