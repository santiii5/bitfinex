## Bitfinex dashboard training project

[Online demo](http://bitfinex.cronnection.at/)

## Overview
Training project using:

- create-react-app
- Bitfinex API
- Websocket
- React
- Redux

## Components
3 basic components using the Bitfinex information

- Order book
- Price ticker
- Trades book

## Functionality

- Each Websocket channel can be stopped and restarted.
- The coin pair can be changed between BTCUSD, LTCUSD and ETHUSD

## TODO

- Add code documentation
- Improve Book component data handle
- Add Book component functionalities:
    - Change precision of the price column
    - Change scaling of the depth bars
- Use redux middleware to handle Websocket calls
