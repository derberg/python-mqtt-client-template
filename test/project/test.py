from client import CommentsServiceClient
from random import randrange
import time

client = CommentsServiceClient()

id_length = 8
min_value = 10**(id_length-1)
max_value = 10**id_length - 1

def read_views(client, user_data, message): 
    print("Received message on topic: " + message.topic)
    print("Message: " + str(message.payload.decode()))

client.receiveCommentViews(read_views)

# Define a function for sending comments liked and unliked
def send_comments():
    while True:
        randomId = randrange(min_value, max_value + 1)
        client.sendCommentLiked(randomId) 
        print("New like for comment " + str(randomId) + " sent to comment/liked")
        
        client.sendCommentUnliked(randomId)
        print("Comment " + str(randomId) + " unliked info sent to comment/unliked")
        
        time.sleep(1)

# Call the function directly 
send_comments()

# Run the MQTT client loop in the main thread
client.loop()
