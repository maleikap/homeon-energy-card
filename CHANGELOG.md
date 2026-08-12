# Changelog

All notable changes to HomeOn Energy Card are documented in this file.

## [1.1.0] - 2026-08-12

### Added

- Added a clear explanation of what HomeOn is doing right now
- Distinguished surplus PV export from deliberate battery energy sales
- Added contextual warnings for SAFE MODE, invalid data, dry-run and disabled inverter control
- Added a current-versus-best selling price comparison with a clear sell/wait decision

## [1.0.5] - 2026-08-12

### Added

- Added the proprietary HomeOn license required by HACS repository validation

## [1.0.4] - 2026-08-12

### Changed

- Replaced technical EMS mode identifiers with readable Polish names in every client view
- Added a matching icon and status color for each known HomeOn Energy Manager mode
- Kept the original technical identifier available as a tooltip for diagnostics
- Added a safe fallback that removes underscores from future, unknown mode identifiers

## [1.0.3] - 2026-07-31

### Fixed

- Restored the exact client layout and mobile energy-flow presentation from version 1.0.1
- Removed the unintended visual and EMS-label changes introduced in version 1.0.2

## [1.0.2] - 2026-07-31

### Changed

- Replaced technical EMS mode codes with readable Polish status messages
- Kept the grid, home and battery flow in a compact horizontal layout on phones
- Reduced mobile node, icon and heading sizes without removing live flow animation
- Improved wrapping of the main HomeOn decision on narrow screens

## [1.0.1] - 2026-07-31

### Changed

- Restored the animated PV, home, grid and battery energy-flow graphic
- Restored PV production quality with actual-versus-expected production data
- Improved the energy-flow layout, tiles and PV quality panel on mobile screens
- Preserved the simplified client view and Pstryk daily financial balance

## [1.0.0] - 2026-07-31

### Added

- Client-focused daily financial chart using Pstryk AIO sale-value and purchase-cost entities
- Live daily sale, purchase and financial balance values
- Optional YAML overrides for both financial entity identifiers

### Changed

- Replaced the diagnostic dashboard with a concise everyday client view
- Reduced the visible interface to EMS status, live energy flow, daily finances, battery targets, prices, PV forecast and next planned action
- Updated project documentation with required and optional integrations
- Updated the bundled logo cache version for automatic HACS delivery

### Removed

- Deye command inspector from the client view
- Entity diagnostics and technical executor details from the client view
- EMS learning statistics and raw historical counters from the client view
- Extended negative-price and PV-reality diagnostic panels from the client view

## [0.2.53] - 2026-07-28

### Fixed

- Duplicate tiles that resolved to the same Home Assistant entity are now shown only once per card section
- Entity discovery remains compatible with existing HomeOn Energy Manager entity identifiers

## [0.2.52] - 2026-07-26

### Added

- Automatic installation of the original HomeOn SVG logo through HACS release assets
- Automated GitHub release publishing for HACS
- Professional project documentation and BuyCoffee support link

### Changed

- Restored the stable dashboard layout based on version 0.2.38
- Simplified card registration to a single `custom:homeon-energy-card` element
- Cleaned the HACS distribution package

### Removed

- Obsolete test cards, operator variants, logo injectors and temporary logo patches

## [0.2.38] - 2026-07-19

### Added

- Negative-price planning view
- PV reality indicators
- EMS learning and diagnostic sections
- 24-hour energy plan and Deye diagnostics
