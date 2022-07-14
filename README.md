# Genshin Auto Reward

## Features

Automatically getting rewards from [site](https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481) by using cookies at 10:00am.

Can use multiply accounts.

## Build

run `npm run build`


## Use

run `node ./dist/index.js` to start schedule.

run `node ./dist/index.js add --accaunt_id={number} --cookie_token={string}` to add/edit accaunt.

run `node ./dist/index.js rm --accaunt_id={number}` to remove accaunt.
