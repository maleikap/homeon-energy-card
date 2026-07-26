# Contributing to HomeOn Energy Card

Contributions and clear bug reports are welcome.

## Before submitting a change

- Keep changes focused and small.
- Do not modify HomeOn Energy Manager as part of a card change.
- Preserve compatibility with the existing `custom:homeon-energy-card` configuration.
- Do not add inline, generated or replacement HomeOn logos.
- Use the original `homeon_logo.svg` asset.
- Keep `homeon-energy-card.js` and `dist/homeon-energy-card.js` identical.
- Keep `homeon_logo.svg` and `dist/homeon_logo.svg` identical.
- Do not add manual `/config/www` installation steps.

## Validation

Before opening a pull request:

1. Check JavaScript syntax.
2. Verify the card in Home Assistant.
3. Test installation or redownload through HACS.
4. Confirm that the logo is installed automatically.
5. Check desktop and mobile layouts.
6. Update `CHANGELOG.md` when the user-visible behavior changes.

## Bug reports

Use the GitHub bug report form and include the card version, Home Assistant version, HACS version, browser console output and a screenshot.
