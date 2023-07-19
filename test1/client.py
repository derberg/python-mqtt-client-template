import paho.mqtt.client as mqtt

mqttBroker = "test.mosquitto.org"

class CommentsServiceClient:

  def __init__(self):
              self.client = mqtt.Client()
              self.client.connect(mqttBroker)

  def sendCommentLiked(self, id):
        topic = "comment/liked"
        self.client.publish(topic, id)
  def sendCommentUnliked(self, id):
        topic = "comment/unliked"
        self.client.publish(topic, id)

