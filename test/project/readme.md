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
1. Create a client instance:

```python
client = CommentsServiceClient()
```
1. Example of how to send messages :

```python

# Message sent to the broker when a comment is liked
client.sendCommentLiked(randomId)
print("Send new message " + str(randomId) + " sent to comment/liked")

# Message sent to the broker when a comment is unliked
client.sendCommentUnliked(randomId)
print("Send new message " + str(randomId) + " sent to comment/unliked")

```
1. Example functions of how to receive messages :

```python

# Message received when a comment is viewed 
def read_views_callback(client, user_data, message): 
    '''Subcribes to a topic and adds a message callback to handle received messages.

      client: MQTT client instance that triggers the callback.

      userdata: User data associated with the client.

      message: MQTT message instance representing the received message which contains information such as topic, payload, etc.'''
         
    print("Received message on topic: " + message.topic)
    print("Message: " + str(message.payload.decode()))

client.receiveCommentViews(read_views_callback)

```
