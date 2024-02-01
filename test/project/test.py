from client import CommentsServiceClient
from random import randrange
import time

client = CommentsServiceClient()

id_length = 8
min_value = 10**(id_length-1)
max_value = 10**id_length - 1

def on_message(client, userdata, message): #   Callback function to handle received messages.
    print("Received message on topic: " + message.topic)
    print("Message: " + str(message.payload.decode()))

client.client.on_message = on_message

while True:
    randomId = randrange(min_value, max_value + 1)

    client.commentLiked(randomId) 
    print("New like for comment " + str(randomId) + " sent to comment/liked")
    
    client.commentUnliked(randomId)
    print("Comment " + str(randomId) + " unliked info sent to comment/unliked")
    
    time.sleep(1)
