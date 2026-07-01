# HomeOn Energy Card

HomeOn Energy Card is a Lovelace dashboard card for HomeOn Energy Manager.

## Features

- PV production
- Home consumption
- Grid import/export
- Battery SOC and power
- EMS mode and decision
- Buy/sell energy prices
- Best sell price window
- Battery charge/discharge targets
- Inverter self-consumption

## Installation with HACS

1. Open HACS.
2. Add this repository as a custom repository.
3. Category: Dashboard.
4. Install HomeOn Energy Card.
5. Add Lovelace resource if HACS does not add it automatically.

Resource URL:

/hacsfiles/homeon-energy-card/homeon-energy-card.js

Resource type:

JavaScript module

## Card YAML

type: custom:homeon-energy-card

## Custom logo

type: custom:homeon-energy-card
logo: /local/homeon/homeon_logo.svg

## Requirements

This card expects entities created by the HomeOn Energy Manager integration.
