const assert = require("node:assert/strict");

global.HTMLElement = class {};
let CardClass = null;
global.customElements = {
  get: () => null,
  define: (_name, constructor) => { CardClass = constructor; }
};

require("../homeon-energy-card.js");

const state = (value, unit = "") => ({
  state: String(value),
  attributes: {
    unit_of_measurement: unit,
    friendly_name: ""
  }
});

const card = new CardClass();
card.config = {};
card._hass = {
  states: {
    "sensor.homeon_energy_manager_homeon_zrodlo_ceny_zakupu": {
      ...state("sensor.pstryk_aio_obecna_cena_zakupu_pradu_2"),
      attributes: { friendly_name: "HomeOn źródło ceny zakupu" }
    },
    "sensor.homeon_energy_manager_homeon_zrodlo_ceny_sprzedazy": {
      ...state("sensor.pstryk_aio_obecna_cena_sprzedazy_pradu_2"),
      attributes: { friendly_name: "HomeOn źródło ceny sprzedaży" }
    },
    "sensor.pstryk_aio_dzienna_wartosc_produkcji_energii": state(99, "PLN"),
    "sensor.pstryk_aio_dzienne_koszty_zuzycia_energii": state(88, "PLN"),
    "sensor.pstryk_aio_dzienna_produkcja_energii_kwh": state(77, "kWh"),
    "sensor.pstryk_aio_dzienne_zuzycie_energii_kwh": state(66, "kWh"),
    "sensor.pstryk_aio_dzienna_wartosc_produkcji_energii_2": state(12.34, "PLN"),
    "sensor.pstryk_aio_dzienne_koszty_zuzycia_energii_2": state(4.56, "PLN"),
    "sensor.pstryk_aio_dzienna_produkcja_energii_kwh_2": state(8.7, "kWh"),
    "sensor.pstryk_aio_dzienne_zuzycie_energii_kwh_2": state(3.25, "kWh")
  }
};

assert.equal(card.pstrykInstanceSuffix(), "_2");
const html = card.financeCard();
assert.match(html, /Pstryk AIO \(2\. instalacja\)/);
assert.match(html, /12,34 PLN/);
assert.match(html, /4,56 PLN/);
assert.match(html, /8\.70 kWh/);
assert.match(html, /3\.25 kWh/);
assert.doesNotMatch(html, /99,00 PLN/);

console.log("finance-card.test.js: OK");
