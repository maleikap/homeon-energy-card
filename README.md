# HomeOn Energy Card

## Version 0.2.44

HomeOn Energy Card 0.2.44 adds an operator panel and fixes legacy custom element registration issues.

### Recommended Lovelace resource

    /hacsfiles/homeon-energy-card/homeon-energy-card-v044.js?v=044

### Recommended card type

    type: custom:homeon-energy-card-v044

### Legacy compatibility

The old file:

    homeon-energy-card.js

is now a safe legacy loader/proxy. It no longer declares the old card class directly, which prevents duplicate `customElements.define` browser errors.

## Operator panel

Version 0.2.44 adds quick access to:

- SAFE_MODE and data quality diagnostics,
- economic sell readiness,
- EMS mode hysteresis,
- Deye Safe Driver status,
- real Deye command diagnostics.

## Notes after update

After updating through HACS, hard refresh the browser cache.

Desktop:

    Ctrl + F5

Mobile app:

    fully close and reopen the Home Assistant app.
