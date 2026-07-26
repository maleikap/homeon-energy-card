<p align="center">
  <img src="homeon_logo.svg" alt="HomeOn" width="520">
</p>

<h1 align="center">HomeOn Energy Card</h1>

<p align="center">
  A Lovelace dashboard card for monitoring and presenting data from HomeOn Energy Manager in Home Assistant.
</p>

<p align="center">
  <a href="https://github.com/maleikap/homeon-energy-card/releases"><img src="https://img.shields.io/github/v/release/maleikap/homeon-energy-card" alt="Latest release"></a>
  <a href="https://github.com/maleikap/homeon-energy-card"><img src="https://img.shields.io/badge/Home%20Assistant-HACS-41BDF5" alt="Home Assistant HACS"></a>
  <a href="https://buycoffee.to/homeon"><img src="https://img.shields.io/badge/Support%20HomeOn-BuyCoffee-F6C344" alt="Support HomeOn on BuyCoffee"></a>
</p>

## Overview

HomeOn Energy Card provides a single dashboard for the most important operating data exposed by HomeOn Energy Manager. It combines live energy flow, battery state, grid exchange, energy prices, forecasts and EMS decisions in a layout designed for everyday use and diagnostics.

The card is a frontend component. Energy management and inverter control are handled by [HomeOn Energy Manager](https://github.com/maleikap/homeon-energy-manager).

## Features

- Live PV, home consumption, battery and grid power overview
- Animated energy-flow presentation
- Battery state of charge, charge and discharge information
- Grid import and export status
- Current purchase and sale prices
- PV forecasts for today and tomorrow
- EMS operating mode and decision details
- 24-hour energy plan and recommended actions
- Negative-price strategy information
- Deye inverter control diagnostics
- EMS learning and historical operating indicators
- Automatic entity discovery for HomeOn Energy Manager entities
- Original HomeOn branding installed together with the card

## Requirements

- Home Assistant
- HACS
- HomeOn Energy Manager with its entities available in Home Assistant

## Installation

1. Open HACS in Home Assistant.
2. Add this repository as a custom repository of type **Dashboard**, if it is not already available.
3. Download **HomeOn Energy Card**.
4. Add the card to a Lovelace dashboard.

Repository URL:

```text
https://github.com/maleikap/homeon-energy-card
```

HACS installs and registers the JavaScript resource and the original HomeOn logo automatically. No files need to be copied manually to `/config/www`.

## Card configuration

Minimal configuration:

```yaml
type: custom:homeon-energy-card
```

Optional title:

```yaml
type: custom:homeon-energy-card
title: HomeOn Energy Dashboard
```

The bundled HomeOn logo is used automatically. A custom logo can be selected only when explicitly required:

```yaml
type: custom:homeon-energy-card
logo: /local/example/custom-logo.svg
```

## Updates

Updates are distributed as GitHub releases and installed through HACS. Each release contains the card script and the original SVG logo required by the dashboard.

After an update, refresh the Home Assistant frontend if the browser still displays a cached version.

## Related project

- [HomeOn Energy Manager](https://github.com/maleikap/homeon-energy-manager) — Home Assistant integration providing EMS logic, entities and inverter-control functions

## Support the project

If HomeOn Energy Card is useful to you and you would like to support its continued development, you can contribute through [BuyCoffee](https://buycoffee.to/homeon).

<p>
  <a href="https://buycoffee.to/homeon"><img src="https://img.shields.io/badge/Support%20HomeOn-BuyCoffee-F6C344?style=for-the-badge" alt="Support HomeOn on BuyCoffee"></a>
</p>

## Support

When reporting a problem, include:

- HomeOn Energy Card version
- Home Assistant version
- Browser console error, if present
- Relevant card configuration
- Screenshot of the problem
