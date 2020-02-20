# foosbot
Slack bot to track foosball matches and ratings

## Commands:

### record
```bash
# @foosbot record :goat: <(@user)+> :whale: <(@user)+> [series <(g|w)+>]

# Record a single match 1v1
@foosbot record 🐐 @mikusem 🐳 @foosbot

# Record a single match 2v2
@foosbot record 🐐 @mikusem @wilsoni 🐳 @foosbot @cervanf

# Record a single match uneven teams
@foosbot record 🐐 @mikusem 🐳 @foosbot @cervanf @wilsoni @weye

# Record a Series of Wins for any team of (g)oats vs (w)hales
@foosbot record 🐐 @mikusem 🐳 @foosbot series ggwg
```

### standings
```bash
# @foosbot standings [overall] [season <season key>] [league <league key>] [player <player id>]

# Print current season standings
@foosbot standings

# Print overall standings
@foosbot standings overall

# Print standings for paticular season
@foosbot standings season 2020Q4

# Print current season standings for a paticular league
@foosbot standings league 🍥

# Print current season standings a paticular player
@foosbot standings player @mikusem

# Combine to get other details
# Print another seasons standings for paticular league
@foosbot standings season 2020Q1 league 🍥
```

### update
```bash
# @foosbot update [league <league key>]

# Sync your registered name with that of Slack
@foosbot update

# Sync your Slack Name and new primary league
@foosbot update league 🍥
```
