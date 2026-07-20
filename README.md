# HomeOn Energy Card

HomeOn Energy Card is a Lovelace dashboard card for HomeOn Energy Manager.

## Version 0.2.40.4

Final frontend registration hotfix.

Only one custom element is registered:

    homeon-energy-card

The old alias `homeon-energy-dashboard` has been removed completely. The registration is additionally protected with try/catch to avoid dashboard crashes if Home Assistant loads an older duplicate resource from cache.

## Resource

Use only one resource in Home Assistant:

- /hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.40.4

or:

- /local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.40.4

Do not use both at the same time.

## Usage

YAML example:

    type: custom:homeon-energy-card
    title: HomeOn Energy Dashboard
