# HomeOn Energy Card

## Version 0.2.49

Fixes display of the original HomeOn logo.

The original `homeon_logo.svg` is stored in the GitHub repository and served by HACS.  
The card now displays it as a wide logo instead of forcing it into a small square.

Recommended Lovelace resource:

    /hacsfiles/homeon-energy-card/homeon-energy-card.js?v=049

Recommended card:

    type: custom:homeon-energy-card
    logo: /hacsfiles/homeon-energy-card/homeon_logo.svg?v=049

After updating/redownloading in HACS, hard refresh the dashboard.
