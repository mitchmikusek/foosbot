# Foosbot

Slack bot to record matches and player ELO

## Setup

To setup, you'll need to create an app in slack and configure the following in their app building dashbaord

### App Event Url

Unless you have a public ip already available, such as via glitch.com, you'll need to create a tunnel to expose the service to slack. Slack's docs recommend using `ngrok` but know on the free plan, you'll have to update the registered url in the slack dashboard each time you restart the tunnel.

### Bot Event Scopes

| Event Scope           | Description                                                                       |
|---                    |---                                                                                |
| app_mention           | Subscribe to only the message events that mention your app or bot                 |


### Bot OAuth Scopes

| Auth Scope            | Description                                                                       |
|---                    |---                                                                                |
| app_mentions:read     | View messages that directly mention @foosbot in conversations that the app is in  |
| chat:write            | Send messages as foosbot                                                          |
| users.profile:read    | View profile details about people in the workspace                                |

### Local Env Vars

The app requires some local environmental variables to be set. Some are for allowing unique persistance targets per environemnt, some for building the slack bot and others for application logic (channel filtering)

```bash
# Environment Config - Example
# Environment Data Store prefix
export FOOSBOT_STORE=local

# From App Dev Page - App ID and Secret to Communicate with Slack
export SLACK_APP=QWAGFGSNE
export SLACK_SIGNING_SECRET=ee3250fg7h5fe94d2379hn8dogfed2ea

# From Installed App Page - OAuth token for Bot
export SLACK_BOT_TOKEN=xoxb-648512387415-153248684511-5GrHrJWhsJndWJSLDKW5Vcn8Y

# Manually Captured - Channels where the bot is allowed to operate for transparency
export SLACK_CHANNELS=CMK6MCK8X,CMF2QWH0X
```

# Attributions

Fooball Img Source - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>