# HomeOn Energy Card

HomeOn Energy Card is a Lovelace dashboard card for HomeOn Energy Manager.

## Version 0.2.40.1

This release fixes safe custom element registration in Home Assistant frontend.

It prevents browser errors caused by registering the same card constructor under multiple custom element names.

## Resource

Use one of the following resources in Home Assistant:

- /hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.40.1
- /local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.40.1

After changing the resource version, refresh the browser cache with Ctrl + F5.

## Usage

YAML example:

    type: custom:homeon-energy-card
    title: HomeOn Energy Dashboard
