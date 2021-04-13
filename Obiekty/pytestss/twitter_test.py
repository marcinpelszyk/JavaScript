import pyte

from twiteer import Twitter


def test_twitter_initialization():
    twitter = Twitter()
    assert twitter


def test_tweet_single_message():
    twitter = Twitter()
    twitter.tweet('Test message')
    assert twitter.tweets == ['Test message']



def test_tweet_long_message():
    twitter = Twitter()
    with pytest.raises():
        twitter.tweet('test'*40)

    


    