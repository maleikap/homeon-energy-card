# HomeOn Energy Card

## Version 0.2.50

Restores the clean HomeOn Energy Card layout from version 0.2.38 and fixes loading of the original HomeOn logo through HACS.

The original `homeon_logo.svg` is stored in both the repository root and `dist/homeon_logo.svg`.
No inline logo, injector, forced logo patch, or replacement fallback is used.

Recommended Lovelace resource:

    /hacsfiles/homeon-energy-card/homeon-energy-card.js?v=050

Recommended card:

    type: custom:homeon-energy-card
    logo: /hacsfiles/homeon-energy-card/homeon_logo.svg?v=050

After updating/redownloading in HACS, remove obsolete local resources and hard refresh the dashboard.
