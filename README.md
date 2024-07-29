# Whats in this Repo

This repo contains a Twitch Extensions "tester".
Which _basically_ implements a most/every feature for test purposes.
And is used to flag a number of [TwitchDev issues](https://github.com/twitchdev/issues/issues)

## Server Port

To change the port that the server listens on for Extension Serving modify the following in server/server.js

```javascript
app.listen(8050, function () {
    console.log("booted express on 8050");
});
```

The use a Reverse SSH Tunnel or NGROK to handle SSL termination for _preferred_ testing on Twitch.

## Things Tested/Iteratated

| [Basic](https://dev.twitch.tv/docs/extensions/reference/#helper-extensions) Callbacks | when                 | docs and notes                                                                         |
| ------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------- |
| `window.Twitch.ext.onAuthorized`                                                      | when it occurs       | [Extensions Ref](https://dev.twitch.tv/docs/extensions/reference/#onauthorized)        |
| `window.Twitch.ext.onContext`                                                         | when it occurs       | [Extensions Ref](https://dev.twitch.tv/docs/extensions/reference/#oncontext)           |
| `window.Twitch.ext.onError`                                                           | when an error occurs | [Extensions Ref](https://dev.twitch.tv/docs/extensions/reference/#onerror)             |
| `window.Twitch.ext.onHighlightChanged`                                                | when it occurs       | [Extensions Ref](https://dev.twitch.tv/docs/extensions/reference/#onhighlightchanged)  |
| `window.Twitch.ext.onVisibilityChanged`                                               | when it occurs       | [Extensions Ref](https://dev.twitch.tv/docs/extensions/reference/#onvisibilitychanged) |

| Extension PubSub Callbacks | when         | docs and notes                                                                                          |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| `window.Twitch.ext.listen` | At Page load | [Listens](https://dev.twitch.tv/docs/extensions/reference/#listen) to the three Extension PubSub Topics |
| `window.Twitch.ext.send`   | At Request   | Not Supported yet                                                                                       |

| [Action](https://dev.twitch.tv/docs/extensions/reference/#helper-actions) Things | when           | docs and notes                                                                                               |
| -------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| `window.Twitch.ext.actions.followChannel`                                        | On Click       | [Follow](https://dev.twitch.tv/docs/extensions/reference/#followchannel) the current channel                 |
| `window.Twitch.ext.actions.onFollow`                                             | when it occurs | [Extensions Ref](https://dev.twitch.tv/docs/extensions/reference/#onfollow)                                  |
| `window.Twitch.ext.actions.minimize`                                             | On Click       | [Minimize](https://dev.twitch.tv/docs/extensions/reference/#minimize) the extension if possible (video)      |
| `window.Twitch.ext.actions.requestIdShare`                                       | On Click       | [Login or Logout](https://dev.twitch.tv/docs/extensions/reference/#requestidshare) the user to the extension |

The [Configuration Service](https://dev.twitch.tv/docs/extensions/reference/#helper-configuration) no table here as complicated, but iterated and onChanged listened to. We don't currently support the set function yet!

[Feature Flags](https://dev.twitch.tv/docs/extensions/reference/#helper-feature-flags) iterated and onChanged listened to

| [Bits](https://dev.twitch.tv/docs/extensions/reference/#helper-bits) | when         | docs and notes                                                                     |
| -------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------- |
| `window.Twitch.ext.bits.getProducts`                                 | On Click     | Fetch all products and build the "shop"                                            |
| `twitch.ext.bits.onTransactionCancelled`                             | On occur     | The user cancelled the bits transaction                                            |
| `twitch.ext.bits.onTransactionComplete`                              | On occur     | The user completed the bits transaction                                            |
| `twitch.ext.bits.showBitsBalance`                                    | On mouseover | Whenever you hover over the "shop", so hit [Get Products] to build the store first |

| [Viewer](https://dev.twitch.tv/docs/extensions/reference/#helper-viewer) Things | when           | docs and notes            |
| ------------------------------------------------------------------------------- | -------------- | ------------------------- |
| `window.Twitch.ext.viewer` iterated                                             | At page load   | Various useful attributes |
| `window.Twitch.ext.viewer.onChanged`                                            | When it occurs | An Attribute changed      |

The [Client Query Parameters](https://dev.twitch.tv/docs/extensions/reference/#client-query-parameters) are iterated

Using the HelixToken [helix is tested](https://dev.twitch.tv/docs/extensions/frontend-api-usage/)

Using the JWT [send extemsion chat](https://dev.twitch.tv/docs/api/reference/#send-extension-chat-message) is testable

## Documentation

-   [Twitch Extensions Reference](https://dev.twitch.tv/docs/extensions/reference)
-   [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
