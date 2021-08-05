# Whats in this Repo

This repo contains a Twitch Extensions "tester".
Which _basically_ implements a most/every feature for test purposes.
And is used to flag a number of (https://github.com/twitchdev/issues/issues)[TwitchDev issues]

## server Port

To change the port that the server listens on for Extension Serving modify the following in server/server.js

```javascript
app.listen(8050, function () {
    console.log('booted express on 8050');
});

```

The use a Reverse SSH Tunnel or NGROK to handle SSL termination for _preferred_ testing on Twitch.

## Documentation

- [Twitch Extensions Reference](https://dev.twitch.tv/docs/extensions/reference)
- [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
