import json
import uuid
from confluent_kafka import Producer

producer_config = {"bootstrap.servers": "localhost:9092"}

producer = Producer(producer_config)


def delivery_report(err, msg):
    if err is not None:
        print(f"Delivery failed: {err}")
    else:
        print(
            f'{msg.value().decode("utf-8")} delivered to {msg.topic()} at [{msg.partition()}] partition at offset {msg.offset()}'
        )


order = {
    "order_id": uuid.uuid4().hex,
    "customer_id": 456,
    "items": [{"item_id": 1, "quantity": 2}, {"item_id": 2, "quantity": 1}],
    "total_price": 29.99,
}

order_json = json.dumps(order).encode("utf-8")

producer.produce(topic="orders", value=order_json, callback=delivery_report)

producer.flush()
