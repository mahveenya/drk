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


order1 = {
    "key": "staple",
    "order_id": uuid.uuid4().hex,
    "customer_id": 456,
    "items": [{"item_id": 1, "quantity": 2}, {"item_id": 2, "quantity": 1}],
    "total_price": 29.99,
}

order2 = {
    "key": "household",
    "order_id": uuid.uuid4().hex,
    "customer_id": 789,
    "items": [{"item_id": 3, "quantity": 1}, {"item_id": 4, "quantity": 3}],
    "total_price": 45.50,
}

order_json1 = json.dumps(order1).encode("utf-8")
order_json2 = json.dumps(order2).encode("utf-8")

producer.produce(topic="orders", value=order_json1, callback=delivery_report)
producer.produce(topic="orders", value=order_json2, callback=delivery_report)

producer.flush()
