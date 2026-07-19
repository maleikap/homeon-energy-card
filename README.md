# HomeOn Energy Card

HomeOn Energy Card is a Lovelace dashboard card for HomeOn Energy Manager.

It provides a clear visual overview of PV production, household consumption, battery state, grid exchange, market prices, EMS decisions and inverter diagnostics.

## Version 0.2.38

### Negative Price Window Planner

This version adds a dedicated visual section for negative electricity price planning.

The card shows:

- upcoming negative-price window,
- start and end time of the window,
- lowest detected buy price,
- required free battery capacity,
- energy that should be freed before the window,
- target battery SOC before negative prices,
- suggested storage release power,
- current strategy and decision reason.

Existing sections remain unchanged:

- PV Reality Check,
- battery targets,
- energy market overview,
- 24-hour plan,
- inverter control diagnostics,
- Deye command preview,
- EMS learning and balance.

## Resource

Use one of the following resources in Home Assistant:

- /hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.38
- /local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.38

After changing the resource version, refresh the browser cache with Ctrl + F5.

## Usage

YAML example:

    type: custom:homeon-energy-card
    title: HomeOn Energy Dashboard

## Requirements

This card is intended to be used together with HomeOn Energy Manager.

For the Negative Price Window Planner section to show useful data, HomeOn Energy Manager must expose the negative-price planner sensors introduced in version 0.2.38.

## Notes

The card only visualises data from Home Assistant entities. It does not directly control the inverter or battery.
