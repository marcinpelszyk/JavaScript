class Twitter(object):

    def __init__(self):
        self.tweets = []


    def tweet(self, message):
        if len(message) > 160:
            raise Exception('Message to long')
        self.tweets.append(message)

    

    