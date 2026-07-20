# HomeOn Energy Card

HomeOn Energy Card is a Lovelace dashboard card for HomeOn Energy Manager.

## Version 0.2.40.5

Frontend registration fix.

This version registers the Lovelace card using a fresh subclass instead of reusing the original constructor. This prevents browser errors when Home Assistant or the browser cache has already seen the previous constructor.

A cache-busting physical file is also provided:

    homeon-energy-card-0405.js

## Resource

Use only one HomeOn card resource in Home Assistant.

Recommended:

    /hacsfiles/homeon-energy-card/homeon-energy-card-0405.js

or:

    /local/community/homeon-energy-card/homeon-energy-card-0405.js

Do not use both at the same time.

## Usage

YAML example:

    type: custom:homeon-energy-card
    title: HomeOn Energy Dashboard
