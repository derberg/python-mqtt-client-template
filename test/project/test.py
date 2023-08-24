from client import CommentsServiceClient
from random import randrange
import time

client = CommentsServiceClient()


id_length = 8
min_value = 10**(id_length-1)  # Minimum value with 8 digits (e.g., 10000000)
max_value = 10**id_length - 1  # Maximum value with 8 digits (e.g., 99999999)

try:

    while True:
        randomId = randrange(min_value, max_value + 1)
        client.sendCommentLiked(randomId)
        print("New like for comment " + str(randomId) + " sent to comment/liked")
        client.sendCommentUnliked(randomId)
        print("Comment " + str(randomId) + " unliked info sent to comment/unliked")
        time.sleep(1)

except KeyboardInterrupt: #this code will run after the above loop stops 
    print("Total views received:", client.view_count)