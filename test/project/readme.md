## Comments Service Client
This service is in charge of processing all the events related to comments.

## Requirements

- Python 3.x
- paho-mqtt 1.6.1
## Install Dependencies

We have a `requirements.txt` file under the template directory containing the `paho-mqtt` package. To install the package, simply use the following:
```python
pip install -r requirements.txt
```
## Usage of Comments Service Client

1. Import the Comments Service Client:

```python
from client import CommentsServiceClient
```
2. Create a client instance:

```python
client = CommentsServiceClient()
```
3. Example on how to send messages :

```python

# Message sent to the broker when a comment is liked
client.sendCommentLiked(randomId)
print("New like for comment " + str(randomId) + " sent to comment/liked")


# Message sent to the broker when a comment is unliked
client.sendCommentUnliked(randomId)
print("New like for comment " + str(randomId) + " sent to comment/unliked")


```
4. Example functions on how to receive messages :

```python

# Message received when a comment is viewed
client.receiveCommentViews(read_views)
print("Received message on topic: " + message.topic)
print("Message: " + str(message.payload.decode()))

```
