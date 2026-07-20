# HomeOn Energy Card

HomeOn Energy Card is a Lovelace dashboard card for HomeOn Energy Manager.

## Version 0.2.40.3

This release fixes the Home Assistant frontend custom element registration.

Only one custom element is registered:

    homeon-energy-card

The old alias `homeon-energy-dashboard` has been removed completely.

## Resource

Use one of the following resources in Home Assistant:

- /hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.40.3
- /local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.40.3

After changing the resource version, refresh the browser cache with Ctrl + F5.

## Usage

YAML example:

    type: custom:homeon-energy-card
    title: HomeOn Energy Dashboard
