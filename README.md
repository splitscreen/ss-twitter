# ss-twitter
A standalone, 0.7.0-compatible version of the Twitter graphic from [toth3-overlay](https://github.com/TipoftheHats/toth3-overlay), which was made for [Tip of the Hats 2015](http://tipofthehats.org/).

This is a [NodeCG](http://github.com/nodecg/nodecg) bundle. It cannot be run on its own, it has to be run as part of an existing NodeCG installation. Please see NodeCG's documentation for installation and setup instructions before continuing with toth3-overlay setup.

## Demo

![Demo image](demo.gif)

[YouTube demo with sound effects](https://www.youtube.com/watch?v=_y1cdy95Emk)

## Installation
1. Install NodeCG (don't forget to run `npm install` from your the root of your NodeCG installation directory after you have installed it! This is what installs all of NodeCG's dependencies, which are required.)

2. Clone ss-twitter to `nodecg/bundles/ss-twitter`

3. Install lfg-sounds (required).
  ```sh
  nodecg install "supportclass/lfg-sounds#~0.1.1"
  ```

4. Create `nodecg/cfg/ss-twitter.json` and `nodecg/cfg/lfg-sounds.json`. These are the necessary config files.

## Configuration
The bundle's config lives at `nodecg/cfg/ss-twitter.json` and is required for the graphic to work.

If you don't have Twitter credentials, you must make them before attempting to use this. Check the developer site for more info on how to register.
```
{
  "consumerKey": "yourConsumerKey",
  "consumerSecret": "yourConsumerSecret",
  "accessTokenKey": "yourAccessTokenKey",
  "accessTokenSecret": "yourAccessTokenSecret"
}
```

For sounds to play, you must also put the following code into `nodecg/cfg/lfg-sounds.json`.
```
{
  "soundNames":[
    "image_in",
    "image_out",
    "tweet_in",
    "tweet_out"
  ]
}
```

## Credits
- [Alex "Lange" Van Camp](http://alexvan.camp/) - Original creator of the code
