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
3. Client functions :

```python
def sendCommentLiked(self, id):
    """
    
    Message sent to the broker when a comment is liked

    Args:

      self: undefined

      id (str) : Comment ID
    
    """
    topic = "comment/liked"
    self.client.publish(topic, id)
def sendCommentUnliked(self, id):
    """
    
    Message sent to the broker when a comment is unliked

    Args:

      self: undefined

      id (str) : Comment ID
    
    """
    topic = "comment/unliked"
    self.client.publish(topic, id)

def receiveCommentViews(self, callback):
    """

    Message received when a comment is viewed

    Args:

      self: undefined

      callback: Callback function to handle received messages
    
    Callback Args:
    
      client: MQTT client instance that triggers the callback.

      userdata: User data associated with the client. It's set when the client is created.

      message: MQTT message instance representing the received message. It contains information such as topic, payload, etc.

    """
    topic = "comment/views"
    self.client.subscribe(topic)
    self.client.message_callback_add(topic, callback)

def loop(self):
'''This is a blocking form of the network loop and will not return until the client calls disconnect(). It automatically handles reconnecting.'''
self.client.loop_forever()
```
