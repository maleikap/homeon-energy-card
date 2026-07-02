class HomeOnEnergyCard extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
    this.logo = this.config.logo || "/hacsfiles/homeon-energy-card/homeon_logo.svg";

    this.labels = {
      mode: "Tryb EMS",
      reason: "Decyzja EMS",

      enabled: "Włączony",
      dryRun: "Tryb testowy dry-run",
      inverterControl: "Sterowanie falownikiem",
      inverterControlAction: "Akcja falownika",
      inverterControlResult: "Wynik sterowania falownikiem",

      soc: "SOC magazynu",
      batteryStatus: "Status baterii",
      batteryPower: "Moc baterii",
      batteryCharge: "Ładowanie baterii",
      batteryDischarge: "Rozładowanie baterii",

      pvPower: "Moc PV",
      loadPower: "Moc domu",
      gridPower: "Moc sieci",
      gridStatus: "Status sieci",
      gridImport: "Import z sieci",
      gridExport: "Eksport do sieci",
      inverterSelf: "Pobór własny falownika",

      buyPrice: "Cena zakupu",
      sellPrice: "Cena sprzedaży",
      bestSellPrice: "Najlepsza cena sprzedaży 24h",
      bestSellTime: "Godzina najlepszej sprzedaży",
      nextBetterSellPrice: "Następna lepsza cena sprzedaży",
      nextBetterSellTime: "Godzina następnej lepszej sprzedaży",
      sellDelta: "Różnica do najlepszej ceny",

      pvToday: "Prognoza PV dziś",
      pvTomorrow: "Prognoza PV jutro",

      chargeTarget: "Cel ładowania",
      dischargeTarget: "Cel rozładowania",
      nightReserve: "Rezerwa nocna",
      morningTarget: "Cel poranny",
      availableSell: "Energia dostępna do sprzedaży",
      freeSpace: "Wolne miejsce w magazynie",
      chargeToTarget: "Energia do celu ładowania",
      aboveMorning: "Energia ponad cel poranny",

      inverterExportTarget: "Maksymalny eksport",
      inverterChargeCurrent: "Prąd ładowania",
      inverterDischargeCurrent: "Prąd rozładowania",
      inverterSafeDischargeCurrent: "Bezpieczny prąd rozładowania",
      inverterBlockDischargeCurrent: "Prąd blokady rozładowania",

      learnSamples: "EMS próbki nauki",
      learnHours: "EMS czas nauki",
      learnConfidence: "EMS pewność nauki",
      learnLastUpdate: "EMS ostatnia nauka",

      learnAvgLoad: "EMS średnie zużycie domu",
      learnAvgDayLoad: "EMS średnie zużycie dzień",
      learnAvgNightLoad: "EMS średnie zużycie noc",
      learnDailyKwh: "EMS szacowane zużycie dobowe",
      learnNightKwh: "EMS szacowane zużycie nocne",

      learnAvgPv: "EMS średnia produkcja PV",
      learnAvgImport: "EMS średni import",
      learnAvgExport: "EMS średni eksport",
      learnAvgBatteryCharge: "EMS średnie ładowanie baterii",
      learnAvgBatteryDischarge: "EMS średnie rozładowanie baterii",
      learnAvgInverterSelf: "EMS średni pobór falownika",

      learnEnergyLoad: "EMS energia domu",
      learnEnergyPv: "EMS energia PV",
      learnEnergyImport: "EMS energia import",
      learnEnergyExport: "EMS energia eksport",
      learnEnergyBatteryCharge: "EMS energia ładowania baterii",
      learnEnergyBatteryDischarge: "EMS energia rozładowania baterii",
      learnEnergyInverterSelf: "EMS energia poboru falownika",

      learnAvgBuy: "EMS średnia cena zakupu",
      learnAvgSell: "EMS średnia cena sprzedaży",
      learnBestSellSeen: "EMS najlepsza zauważona cena sprzedaży",
      learnMostMode: "EMS najczęstszy tryb",
      planPhase: "Plan faza dnia",
      planRecommendedSoc: "Plan zalecany SOC",
      planNextAction: "Plan następna akcja",
      planNextActionTime: "Plan godzina następnej akcji",
      planNextActionReason: "Plan powód następnej akcji",
      planChargeWindow: "Plan okno taniego ładowania",
      planSellWindow: "Plan okno najlepszej sprzedaży",
      planHoldReason: "Plan powód trzymania energii",
      planNightKwh: "Plan prognoza zużycia nocnego",
      planDayKwh: "Plan prognoza zużycia 24h",
      planCheapestBuy: "Plan najtańsza cena zakupu",
      planBestSell: "Plan najlepsza cena sprzedaży",
      planOverview: "Plan 24h podsumowanie",
      planWeatherTomorrow: "Plan pogoda jutro",
      planPvTomorrow: "Plan prognoza PV jutro",
      planEnergyBalanceTomorrow: "Plan bilans energii jutro",
      planEnergyToKeep: "Plan energia do zostawienia",
      planSafeToSell: "Plan bezpieczna energia do sprzedaży",
      planSafeExportLimit: "Plan bezpieczny limit eksportu",
      planWeatherStrategy: "Plan strategia pogoda",
      planReasonableBuyWindow: "Plan okno normalnego zakupu",
      learnPeakHour: "EMS godzina największego zużycia",
      learnPeakLoad: "EMS największe godzinowe zużycie",
      learnLowHour: "EMS godzina najniższego zużycia",
      learnLowLoad: "EMS najniższe godzinowe zużycie"
    };

    this.candidates = {
      mode: [
        "sensor.homeon_tryb_ems",
        "sensor.homeon_energy_manager_tryb_ems",
        "sensor.homeon_energy_manager_homeon_tryb_ems"
      ],
      reason: [
        "sensor.homeon_decyzja_ems",
        "sensor.homeon_energy_manager_decyzja_ems",
        "sensor.homeon_energy_manager_homeon_decyzja_ems"
      ],

      enabled: [
        "switch.homeon_wlaczony",
        "switch.homeon_energy_manager_wlaczony",
        "switch.homeon_energy_manager_homeon_wlaczony"
      ],
      dryRun: [
        "switch.homeon_tryb_testowy_dry_run",
        "switch.homeon_energy_manager_tryb_testowy_dry_run",
        "switch.homeon_energy_manager_homeon_tryb_testowy_dry_run"
      ],
      inverterControl: [
        "switch.homeon_sterowanie_falownikiem",
        "switch.homeon_energy_manager_sterowanie_falownikiem",
        "switch.homeon_energy_manager_homeon_sterowanie_falownikiem"
      ],
      inverterControlAction: [
        "sensor.homeon_akcja_falownika",
        "sensor.homeon_energy_manager_akcja_falownika",
        "sensor.homeon_energy_manager_homeon_akcja_falownika"
      ],
      inverterControlResult: [
        "sensor.homeon_wynik_sterowania_falownikiem",
        "sensor.homeon_energy_manager_wynik_sterowania_falownikiem",
        "sensor.homeon_energy_manager_homeon_wynik_sterowania_falownikiem"
      ],

      soc: [
        "sensor.homeon_soc_magazynu",
        "sensor.homeon_energy_manager_soc_magazynu",
        "sensor.homeon_energy_manager_homeon_soc_magazynu"
      ],
      batteryStatus: [
        "sensor.homeon_status_baterii",
        "sensor.homeon_energy_manager_status_baterii",
        "sensor.homeon_energy_manager_homeon_status_baterii"
      ],
      batteryPower: [
        "sensor.homeon_moc_baterii",
        "sensor.homeon_energy_manager_moc_baterii",
        "sensor.homeon_energy_manager_homeon_moc_baterii"
      ],
      batteryCharge: [
        "sensor.homeon_ladowanie_baterii",
        "sensor.homeon_energy_manager_ladowanie_baterii",
        "sensor.homeon_energy_manager_homeon_ladowanie_baterii"
      ],
      batteryDischarge: [
        "sensor.homeon_rozladowanie_baterii",
        "sensor.homeon_energy_manager_rozladowanie_baterii",
        "sensor.homeon_energy_manager_homeon_rozladowanie_baterii"
      ],

      pvPower: [
        "sensor.homeon_moc_pv",
        "sensor.homeon_energy_manager_moc_pv",
        "sensor.homeon_energy_manager_homeon_moc_pv"
      ],
      loadPower: [
        "sensor.homeon_moc_domu",
        "sensor.homeon_energy_manager_moc_domu",
        "sensor.homeon_energy_manager_homeon_moc_domu"
      ],
      gridPower: [
        "sensor.homeon_moc_sieci",
        "sensor.homeon_energy_manager_moc_sieci",
        "sensor.homeon_energy_manager_homeon_moc_sieci"
      ],
      gridStatus: [
        "sensor.homeon_status_sieci",
        "sensor.homeon_energy_manager_status_sieci",
        "sensor.homeon_energy_manager_homeon_status_sieci"
      ],
      gridImport: [
        "sensor.homeon_import_z_sieci",
        "sensor.homeon_energy_manager_import_z_sieci",
        "sensor.homeon_energy_manager_homeon_import_z_sieci"
      ],
      gridExport: [
        "sensor.homeon_eksport_do_sieci",
        "sensor.homeon_energy_manager_eksport_do_sieci",
        "sensor.homeon_energy_manager_homeon_eksport_do_sieci"
      ],
      inverterSelf: [
        "sensor.homeon_pobor_wlasny_falownika",
        "sensor.homeon_energy_manager_pobor_wlasny_falownika",
        "sensor.homeon_energy_manager_homeon_pobor_wlasny_falownika"
      ],

      buyPrice: [
        "sensor.homeon_cena_zakupu",
        "sensor.homeon_energy_manager_cena_zakupu",
        "sensor.homeon_energy_manager_homeon_cena_zakupu"
      ],
      sellPrice: [
        "sensor.homeon_cena_sprzedazy",
        "sensor.homeon_energy_manager_cena_sprzedazy",
        "sensor.homeon_energy_manager_homeon_cena_sprzedazy"
      ],
      bestSellPrice: [
        "sensor.homeon_najlepsza_cena_sprzedazy_24h",
        "sensor.homeon_energy_manager_najlepsza_cena_sprzedazy_24h",
        "sensor.homeon_energy_manager_homeon_najlepsza_cena_sprzedazy_24h"
      ],
      bestSellTime: [
        "sensor.homeon_godzina_najlepszej_sprzedazy",
        "sensor.homeon_energy_manager_godzina_najlepszej_sprzedazy",
        "sensor.homeon_energy_manager_homeon_godzina_najlepszej_sprzedazy"
      ],
      nextBetterSellPrice: [
        "sensor.homeon_nastepna_lepsza_cena_sprzedazy",
        "sensor.homeon_energy_manager_nastepna_lepsza_cena_sprzedazy",
        "sensor.homeon_energy_manager_homeon_nastepna_lepsza_cena_sprzedazy"
      ],
      nextBetterSellTime: [
        "sensor.homeon_godzina_nastepnej_lepszej_sprzedazy",
        "sensor.homeon_energy_manager_godzina_nastepnej_lepszej_sprzedazy",
        "sensor.homeon_energy_manager_homeon_godzina_nastepnej_lepszej_sprzedazy"
      ],
      sellDelta: [
        "sensor.homeon_roznica_do_najlepszej_ceny",
        "sensor.homeon_energy_manager_roznica_do_najlepszej_ceny",
        "sensor.homeon_energy_manager_homeon_roznica_do_najlepszej_ceny"
      ],

      pvToday: [
        "sensor.homeon_prognoza_pv_dzis",
        "sensor.homeon_energy_manager_prognoza_pv_dzis",
        "sensor.homeon_energy_manager_homeon_prognoza_pv_dzis"
      ],
      pvTomorrow: [
        "sensor.homeon_prognoza_pv_jutro",
        "sensor.homeon_energy_manager_prognoza_pv_jutro",
        "sensor.homeon_energy_manager_homeon_prognoza_pv_jutro"
      ],

      chargeTarget: [
        "sensor.homeon_cel_ladowania",
        "sensor.homeon_energy_manager_cel_ladowania",
        "sensor.homeon_energy_manager_homeon_cel_ladowania"
      ],
      dischargeTarget: [
        "sensor.homeon_cel_rozladowania",
        "sensor.homeon_energy_manager_cel_rozladowania",
        "sensor.homeon_energy_manager_homeon_cel_rozladowania"
      ],
      nightReserve: [
        "sensor.homeon_rezerwa_nocna",
        "sensor.homeon_energy_manager_rezerwa_nocna",
        "sensor.homeon_energy_manager_homeon_rezerwa_nocna"
      ],
      morningTarget: [
        "sensor.homeon_cel_poranny",
        "sensor.homeon_energy_manager_cel_poranny",
        "sensor.homeon_energy_manager_homeon_cel_poranny"
      ],
      availableSell: [
        "sensor.homeon_energia_dostepna_do_sprzedazy",
        "sensor.homeon_energy_manager_energia_dostepna_do_sprzedazy",
        "sensor.homeon_energy_manager_homeon_energia_dostepna_do_sprzedazy"
      ],
      freeSpace: [
        "sensor.homeon_wolne_miejsce_w_magazynie",
        "sensor.homeon_energy_manager_wolne_miejsce_w_magazynie",
        "sensor.homeon_energy_manager_homeon_wolne_miejsce_w_magazynie"
      ],
      chargeToTarget: [
        "sensor.homeon_energia_do_celu_ladowania",
        "sensor.homeon_energy_manager_energia_do_celu_ladowania",
        "sensor.homeon_energy_manager_homeon_energia_do_celu_ladowania"
      ],
      aboveMorning: [
        "sensor.homeon_energia_ponad_cel_poranny",
        "sensor.homeon_energy_manager_energia_ponad_cel_poranny",
        "sensor.homeon_energy_manager_homeon_energia_ponad_cel_poranny"
      ],

      inverterExportTarget: [
        "number.homeon_maksymalny_eksport",
        "number.homeon_energy_manager_maksymalny_eksport",
        "number.homeon_energy_manager_homeon_maksymalny_eksport"
      ],
      inverterChargeCurrent: [
        "number.homeon_prad_ladowania",
        "number.homeon_energy_manager_prad_ladowania",
        "number.homeon_energy_manager_homeon_prad_ladowania"
      ],
      inverterDischargeCurrent: [
        "number.homeon_prad_rozladowania",
        "number.homeon_energy_manager_prad_rozladowania",
        "number.homeon_energy_manager_homeon_prad_rozladowania"
      ],
      inverterSafeDischargeCurrent: [
        "number.homeon_bezpieczny_prad_rozladowania",
        "number.homeon_energy_manager_bezpieczny_prad_rozladowania",
        "number.homeon_energy_manager_homeon_bezpieczny_prad_rozladowania"
      ],
      inverterBlockDischargeCurrent: [
        "number.homeon_prad_blokady_rozladowania",
        "number.homeon_energy_manager_prad_blokady_rozladowania",
        "number.homeon_energy_manager_homeon_prad_blokady_rozladowania"
      ]
    };

    const learning = {
      learnSamples: "EMS próbki nauki",
      learnHours: "EMS czas nauki",
      learnConfidence: "EMS pewność nauki",
      learnLastUpdate: "EMS ostatnia nauka",
      learnAvgLoad: "EMS średnie zużycie domu",
      learnAvgDayLoad: "EMS średnie zużycie dzień",
      learnAvgNightLoad: "EMS średnie zużycie noc",
      learnDailyKwh: "EMS szacowane zużycie dobowe",
      learnNightKwh: "EMS szacowane zużycie nocne",
      learnAvgPv: "EMS średnia produkcja PV",
      learnAvgImport: "EMS średni import",
      learnAvgExport: "EMS średni eksport",
      learnAvgBatteryCharge: "EMS średnie ładowanie baterii",
      learnAvgBatteryDischarge: "EMS średnie rozładowanie baterii",
      learnAvgInverterSelf: "EMS średni pobór falownika",
      learnEnergyLoad: "EMS energia domu",
      learnEnergyPv: "EMS energia PV",
      learnEnergyImport: "EMS energia import",
      learnEnergyExport: "EMS energia eksport",
      learnEnergyBatteryCharge: "EMS energia ładowania baterii",
      learnEnergyBatteryDischarge: "EMS energia rozładowania baterii",
      learnEnergyInverterSelf: "EMS energia poboru falownika",
      learnAvgBuy: "EMS średnia cena zakupu",
      learnAvgSell: "EMS średnia cena sprzedaży",
      learnBestSellSeen: "EMS najlepsza zauważona cena sprzedaży",
      learnMostMode: "EMS najczęstszy tryb",
      planPhase: "Plan faza dnia",
      planRecommendedSoc: "Plan zalecany SOC",
      planNextAction: "Plan następna akcja",
      planNextActionTime: "Plan godzina następnej akcji",
      planNextActionReason: "Plan powód następnej akcji",
      planChargeWindow: "Plan okno taniego ładowania",
      planSellWindow: "Plan okno najlepszej sprzedaży",
      planHoldReason: "Plan powód trzymania energii",
      planNightKwh: "Plan prognoza zużycia nocnego",
      planDayKwh: "Plan prognoza zużycia 24h",
      planCheapestBuy: "Plan najtańsza cena zakupu",
      planBestSell: "Plan najlepsza cena sprzedaży",
      planOverview: "Plan 24h podsumowanie",
      planWeatherTomorrow: "Plan pogoda jutro",
      planPvTomorrow: "Plan prognoza PV jutro",
      planEnergyBalanceTomorrow: "Plan bilans energii jutro",
      planEnergyToKeep: "Plan energia do zostawienia",
      planSafeToSell: "Plan bezpieczna energia do sprzedaży",
      planSafeExportLimit: "Plan bezpieczny limit eksportu",
      planWeatherStrategy: "Plan strategia pogoda",
      planReasonableBuyWindow: "Plan okno normalnego zakupu",
      learnPeakHour: "EMS godzina największego zużycia",
      learnPeakLoad: "EMS największe godzinowe zużycie",
      learnLowHour: "EMS godzina najniższego zużycia",
      learnLowLoad: "EMS najniższe godzinowe zużycie"
    };

    for (const [key, label] of Object.entries(learning)) {
      const n = this.norm(label);
      this.candidates[key] = [
        `sensor.homeon_${n}`,
        `sensor.homeon_energy_manager_${n}`,
        `sensor.homeon_energy_manager_homeon_${n}`
      ];
    }

    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    return 10;
  }

  norm(v) {
    return String(v || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  entity(key) {
    if (!this._hass) return null;

    const override = this.config.entities && this.config.entities[key];
    if (override && this._hass.states[override]) return override;

    for (const id of this.candidates[key] || []) {
      if (this._hass.states[id]) return id;
    }

    const label = this.labels[key];
    const target = this.norm(label);

    for (const [id, obj] of Object.entries(this._hass.states)) {
      if (!id.includes("homeon")) continue;

      const friendly = obj.attributes?.friendly_name || "";
      const idNorm = this.norm(id);
      const friendlyNorm = this.norm(friendly);

      if (
        idNorm.endsWith(target) ||
        idNorm.includes(target) ||
        friendlyNorm.endsWith(target) ||
        friendlyNorm.includes(target)
      ) {
        return id;
      }
    }

    return null;
  }

  st(key, fallback = "-") {
    const id = this.entity(key);
    if (!id || !this._hass.states[id]) return fallback;

    const value = this._hass.states[id].state;
    if (value === "unknown" || value === "unavailable" || value === undefined || value === null) return fallback;
    return value;
  }

  unit(key) {
    const id = this.entity(key);
    if (!id || !this._hass.states[id]) return "";
    return this._hass.states[id].attributes.unit_of_measurement || "";
  }

  num(key, fallback = 0) {
    const raw = this.st(key, fallback);
    const n = Number(String(raw).replace(",", "."));
    return Number.isFinite(n) ? n : fallback;
  }

  fmt(key, digits = null) {
    const raw = this.st(key, "-");
    const unit = this.unit(key);

    const n = Number(String(raw).replace(",", "."));
    if (Number.isFinite(n)) {
      const d = digits === null ? (Math.abs(n) < 10 && n % 1 !== 0 ? 2 : 0) : digits;
      return `${n.toFixed(d)} ${unit}`.trim();
    }

    return `${this.esc(raw)} ${this.esc(unit)}`.trim();
  }

  esc(v) {
    return String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  boolText(key) {
    const value = String(this.st(key, "off")).toLowerCase();
    if (value === "on" || value === "true") return "ON";
    if (value === "off" || value === "false") return "OFF";
    return value.toUpperCase();
  }

  boolClass(key) {
    return this.boolText(key) === "ON" ? "ok" : "muted";
  }

  modeInfo(mode) {
    const raw = String(mode || "");
    const map = {
      DISABLED: ["Wyłączony", "muted"],
      EMERGENCY_RESERVE: ["Rezerwa awaryjna", "alarm"],
      NEGATIVE_IMPORT: ["Ładowanie z taniej energii", "charge"],
      CHEAP_CHARGE: ["Tanie ładowanie", "charge"],
      WAIT_BETTER_SELL_PRICE: ["Czeka na lepszą cenę", "wait"],
      WEATHER_HOLD_RESERVE: ["Rezerwa pod pogodę", "wait"],
      SELL_BATTERY_HIGH_PRICE: ["Sprzedaż baterii", "sell"],
      PV_CHARGE: ["Ładowanie z PV", "charge"],
      EXPENSIVE_SELF_USE: ["Droga energia — autokonsumpcja", "self"],
      NORMAL: ["Normalna praca", "normal"]
    };

    return map[raw] || [raw || "-", "normal"];
  }

  pct(value) {
    return Math.max(0, Math.min(100, Number(value) || 0));
  }

  bar(value, maxValue) {
    const n = Math.max(0, Number(value) || 0);
    const max = Math.max(1, Number(maxValue) || 1);
    return this.pct((n / max) * 100);
  }

  metric(label, value, sub = "", icon = "") {
    return `
      <div class="metric">
        <div class="metric-head">
          ${icon ? `<ha-icon icon="${this.esc(icon)}"></ha-icon>` : ""}
          <span>${this.esc(label)}</span>
        </div>
        <div class="metric-value">${value}</div>
        ${sub ? `<div class="metric-sub">${sub}</div>` : ""}
      </div>
    `;
  }

  row(label, value, pct = null) {
    return `
      <div class="learn-row">
        <div class="learn-row-top">
          <span>${this.esc(label)}</span>
          <b>${value}</b>
        </div>
        ${pct === null ? "" : `<div class="mini-bar"><div style="width:${this.pct(pct)}%"></div></div>`}
      </div>
    `;
  }

  render() {
    if (!this.shadowRoot || !this._hass) return;

    const modeRaw = this.st("mode");
    const [modeLabel, modeClass] = this.modeInfo(modeRaw);
    const reason = this.st("reason");

    const soc = this.pct(this.num("soc", 0));
    const chargeTarget = this.pct(this.num("chargeTarget", 0));
    const dischargeTarget = this.pct(this.num("dischargeTarget", 0));
    const morningTarget = this.pct(this.num("morningTarget", 0));
    const confidence = this.pct(this.num("learnConfidence", 0));

    const pvPower = this.num("pvPower", 0);
    const loadPower = this.num("loadPower", 0);
    const gridPower = this.num("gridPower", 0);
    const batteryPower = this.num("batteryPower", 0);

    const dailyKwh = this.num("learnDailyKwh", 0);
    const nightKwh = this.num("learnNightKwh", 0);
    const avgLoad = this.num("learnAvgLoad", 0);
    const avgDay = this.num("learnAvgDayLoad", 0);
    const avgNight = this.num("learnAvgNightLoad", 0);

    const energyLoad = this.num("learnEnergyLoad", 0);
    const energyPv = this.num("learnEnergyPv", 0);
    const energyImport = this.num("learnEnergyImport", 0);
    const energyExport = this.num("learnEnergyExport", 0);
    const maxEnergy = Math.max(energyLoad, energyPv, energyImport, energyExport, 1);

    const importantKeys = [
      "mode",
      "reason",
      "soc",
      "batteryPower",
      "pvPower",
      "loadPower",
      "gridPower",
      "buyPrice",
      "sellPrice"
    ];

    const missing = importantKeys.filter(k => !this.entity(k));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --homeon-bg: #07111f;
          --homeon-surface: rgba(255,255,255,0.075);
          --homeon-surface-2: rgba(255,255,255,0.105);
          --homeon-line: rgba(255,255,255,0.14);
          --homeon-text: #eef6ff;
          --homeon-muted: #8fa4b8;
          --homeon-blue: #36a3ff;
          --homeon-green: #35d48b;
          --homeon-amber: #ffd166;
          --homeon-red: #ff5c77;
          --homeon-purple: #aa7cff;
        }

        ha-card {
          border-radius: 26px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
        }

        .shell {
          position: relative;
          color: var(--homeon-text);
          background:
            radial-gradient(circle at 12% 0%, rgba(54,163,255,0.20), transparent 28%),
            radial-gradient(circle at 88% 8%, rgba(53,212,139,0.14), transparent 26%),
            linear-gradient(145deg, #06101d 0%, #0a1628 46%, #07131d 100%);
          border: 1px solid var(--homeon-line);
          border-radius: 26px;
          padding: 18px;
          font-family: var(--ha-font-family, Inter, Roboto, Arial, sans-serif);
        }

        .shell:before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.030) 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 55%);
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 15px;
          min-width: 0;
        }

        .brand img {
          width: 132px;
          max-width: 132px;
          height: auto;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.35));
        }

        .title {
          font-size: 21px;
          line-height: 1.05;
          font-weight: 860;
          letter-spacing: -0.02em;
        }

        .subtitle {
          margin-top: 5px;
          color: var(--homeon-muted);
          font-size: 12px;
          letter-spacing: 0.02em;
        }

        .status-strip {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.13);
          color: var(--homeon-muted);
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .chip ha-icon {
          --mdc-icon-size: 16px;
        }

        .chip.ok { color: var(--homeon-green); }
        .chip.warn { color: var(--homeon-amber); }
        .chip.alarm { color: var(--homeon-red); }
        .chip.muted { color: var(--homeon-muted); }

        .hero {
          display: grid;
          grid-template-columns: minmax(270px, 0.95fr) minmax(340px, 1.35fr) minmax(270px, 0.95fr);
          gap: 14px;
        }

        .panel {
          background: rgba(255,255,255,0.068);
          border: 1px solid var(--homeon-line);
          border-radius: 22px;
          padding: 14px;
          min-width: 0;
          backdrop-filter: blur(16px);
        }

        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
          color: var(--homeon-muted);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          font-weight: 800;
        }

        .section-title ha-icon {
          --mdc-icon-size: 18px;
        }

        .mode-card {
          border-radius: 20px;
          padding: 15px;
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.055));
          border: 1px solid rgba(255,255,255,0.14);
        }

        .mode-line {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .mode-name {
          font-size: 24px;
          line-height: 1.12;
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .mode-code {
          margin-top: 6px;
          color: var(--homeon-muted);
          font-size: 11px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }

        .mode-dot {
          width: 13px;
          height: 13px;
          border-radius: 999px;
          margin-top: 6px;
          background: var(--homeon-blue);
          box-shadow: 0 0 0 6px rgba(54,163,255,0.14);
        }

        .mode-card.sell .mode-dot { background: var(--homeon-green); box-shadow: 0 0 0 6px rgba(53,212,139,0.14); }
        .mode-card.charge .mode-dot { background: var(--homeon-amber); box-shadow: 0 0 0 6px rgba(255,209,102,0.14); }
        .mode-card.wait .mode-dot { background: var(--homeon-amber); box-shadow: 0 0 0 6px rgba(255,209,102,0.14); }
        .mode-card.self .mode-dot { background: var(--homeon-purple); box-shadow: 0 0 0 6px rgba(170,124,255,0.14); }
        .mode-card.alarm .mode-dot { background: var(--homeon-red); box-shadow: 0 0 0 6px rgba(255,92,119,0.14); }
        .mode-card.muted .mode-dot { background: var(--homeon-muted); box-shadow: 0 0 0 6px rgba(143,164,184,0.14); }

        .decision {
          margin-top: 12px;
          color: #cfe1f2;
          font-size: 13px;
          line-height: 1.45;
        }

        .soc-block {
          margin-top: 14px;
        }

        .soc-top {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 10px;
        }

        .soc-value {
          font-size: 48px;
          font-weight: 920;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .soc-label {
          color: var(--homeon-muted);
          font-size: 12px;
          margin-bottom: 5px;
        }

        .soc-bar {
          position: relative;
          height: 18px;
          margin-top: 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          overflow: hidden;
        }

        .soc-fill {
          height: 100%;
          width: ${soc}%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--homeon-green), var(--homeon-blue));
        }

        .soc-marker {
          position: absolute;
          top: -5px;
          width: 3px;
          height: 28px;
          border-radius: 999px;
          background: white;
        }

        .soc-marker.charge { left: ${chargeTarget}%; background: var(--homeon-amber); }
        .soc-marker.discharge { left: ${dischargeTarget}%; background: var(--homeon-red); }
        .soc-marker.morning { left: ${morningTarget}%; background: var(--homeon-purple); }

        .target-list {
          display: grid;
          gap: 7px;
          margin-top: 11px;
          color: var(--homeon-muted);
          font-size: 12px;
        }

        .target-list b {
          color: var(--homeon-text);
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .metric {
          min-width: 0;
          padding: 12px;
          border-radius: 17px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.105);
        }

        .metric-head {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--homeon-muted);
          font-size: 11px;
          font-weight: 750;
        }

        .metric-head ha-icon {
          --mdc-icon-size: 17px;
        }

        .metric-value {
          margin-top: 6px;
          font-size: 20px;
          line-height: 1.12;
          font-weight: 880;
          letter-spacing: -0.025em;
          overflow-wrap: anywhere;
        }

        .metric-sub {
          margin-top: 4px;
          color: var(--homeon-muted);
          font-size: 11px;
          overflow-wrap: anywhere;
        }

        .flow {
          position: relative;
          min-height: 454px;
          padding: 16px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 50% 38%, rgba(54,163,255,0.12), transparent 33%),
            rgba(255,255,255,0.052);
          border: 1px solid var(--homeon-line);
        }

        .flow-grid {
          height: 402px;
          display: grid;
          grid-template-columns: 1fr 1.08fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          gap: 18px;
          align-items: center;
        }

        .flow-node {
          position: relative;
          z-index: 2;
          min-height: 106px;
          border-radius: 22px;
          padding: 12px;
          background: rgba(255,255,255,0.092);
          border: 1px solid rgba(255,255,255,0.14);
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }

        .flow-node.main {
          min-height: 132px;
          background: linear-gradient(145deg, rgba(54,163,255,0.18), rgba(255,255,255,0.075));
        }

        .flow-node ha-icon {
          --mdc-icon-size: 30px;
          color: var(--homeon-blue);
          margin: 0 auto 8px;
        }

        .flow-name {
          color: var(--homeon-muted);
          text-transform: uppercase;
          letter-spacing: 0.10em;
          font-size: 10px;
          font-weight: 850;
        }

        .flow-value {
          margin-top: 5px;
          font-size: 21px;
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .flow-sub {
          margin-top: 4px;
          color: var(--homeon-muted);
          font-size: 11px;
        }

        .flow-line {
          position: absolute;
          z-index: 1;
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
          overflow: hidden;
        }

        .flow-line:after {
          content: "";
          position: absolute;
          border-radius: inherit;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent);
          opacity: 0.9;
        }

        .flow-line.idle {
          opacity: 0.24;
        }

        .flow-line.idle:after {
          display: none;
        }

        .line-v {
          width: 4px;
          left: calc(50% - 2px);
        }

        .line-v:after {
          width: 4px;
          height: 32px;
          animation: flowY 1.35s linear infinite;
        }

        .line-h {
          height: 4px;
          top: calc(50% - 2px);
        }

        .line-h:after {
          width: 42px;
          height: 4px;
          animation: flowX 1.35s linear infinite;
        }

        .line-h.reverse:after {
          animation-name: flowXRev;
        }

        .pv-home { top: 118px; height: 72px; background: linear-gradient(180deg, transparent, var(--homeon-amber), transparent); }
        .home-inverter { top: 296px; height: 60px; background: linear-gradient(180deg, transparent, var(--homeon-purple), transparent); }
        .grid-home { left: 78px; width: calc(50% - 138px); background: linear-gradient(90deg, transparent, var(--homeon-blue), transparent); }
        .home-battery { right: 78px; width: calc(50% - 138px); background: linear-gradient(90deg, transparent, var(--homeon-green), transparent); }

        @keyframes flowY {
          from { top: -34px; }
          to { top: 100%; }
        }

        @keyframes flowX {
          from { left: -44px; }
          to { left: 100%; }
        }

        @keyframes flowXRev {
          from { left: 100%; }
          to { left: -44px; }
        }

        .flow-pv { grid-column: 2; grid-row: 1; }
        .flow-gridnode { grid-column: 1; grid-row: 2; }
        .flow-home { grid-column: 2; grid-row: 2; }
        .flow-battery { grid-column: 3; grid-row: 2; }
        .flow-inverter { grid-column: 2; grid-row: 3; }

        .learn {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 14px;
        }

        .learn-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--homeon-line);
          border-radius: 22px;
          padding: 14px;
        }

        .confidence {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: center;
        }

        .confidence-num {
          font-size: 42px;
          font-weight: 930;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .confidence-text {
          color: var(--homeon-muted);
          font-size: 12px;
          line-height: 1.4;
        }

        .confidence-bar {
          grid-column: 1 / -1;
          height: 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          width: ${confidence}%;
          background: linear-gradient(90deg, var(--homeon-amber), var(--homeon-green));
        }

        .learn-rows {
          display: grid;
          gap: 10px;
        }

        .learn-row-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: var(--homeon-muted);
          font-size: 12px;
        }

        .learn-row-top b {
          color: var(--homeon-text);
          font-weight: 850;
          white-space: nowrap;
        }

        .mini-bar {
          height: 8px;
          margin-top: 6px;
          background: rgba(255,255,255,0.11);
          border-radius: 999px;
          overflow: hidden;
        }

        .mini-bar div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--homeon-blue), var(--homeon-green));
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 14px;
          margin-top: 14px;
        }

        .action-box {
          padding: 13px;
          border-radius: 18px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.11);
          color: #d7e7f5;
          font-size: 13px;
          line-height: 1.45;
        }

        .missing {
          margin-bottom: 14px;
          padding: 12px 14px;
          border-radius: 18px;
          background: rgba(255,92,119,0.10);
          border: 1px solid rgba(255,92,119,0.35);
          color: #ffd9e2;
          font-size: 13px;
          line-height: 1.45;
        }

        @media (max-width: 1100px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .flow {
            min-height: 420px;
          }

          .footer-grid,
          .learn {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .shell {
            padding: 13px;
            border-radius: 20px;
          }

          .header {
            grid-template-columns: 1fr;
          }

          .status-strip {
            justify-content: flex-start;
          }

          .brand img {
            width: 112px;
            max-width: 112px;
          }

          .metrics {
            grid-template-columns: 1fr;
          }

          .flow {
            min-height: 0;
          }

          .flow-grid {
            height: auto;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: none;
          }

          .flow-node,
          .flow-node.main {
            grid-column: auto;
            grid-row: auto;
          }

          .flow-line {
            display: none;
          }
        }
      </style>

      <ha-card>
        <div class="shell">
          <div class="content">
            <div class="header">
              <div class="brand">
                <img src="${this.esc(this.logo)}" alt="HomeOn">
                <div>
                  <div class="title">HomeOn Energy Manager</div>
                  <div class="subtitle">PV · magazyn energii · ceny dynamiczne · sterowanie falownikiem</div>
                </div>
              </div>

              <div class="status-strip">
                <span class="chip ${this.boolClass("enabled")}"><ha-icon icon="mdi:power"></ha-icon>EMS ${this.esc(this.boolText("enabled"))}</span>
                <span class="chip ${this.boolText("dryRun") === "ON" ? "warn" : "ok"}"><ha-icon icon="mdi:test-tube"></ha-icon>Dry-run ${this.esc(this.boolText("dryRun"))}</span>
                <span class="chip ${this.boolClass("inverterControl")}"><ha-icon icon="mdi:power-settings"></ha-icon>Falownik ${this.esc(this.boolText("inverterControl"))}</span>
                <span class="chip ${confidence >= 70 ? "ok" : confidence >= 30 ? "warn" : "muted"}"><ha-icon icon="mdi:brain"></ha-icon>Nauka ${confidence.toFixed(0)}%</span>
              </div>
            </div>

            ${missing.length ? `<div class="missing"><b>Brakuje części encji:</b> ${missing.map(k => this.esc(this.labels[k])).join(", ")}. Karta dalej próbuje dopasować encje po nazwach przyjaznych.</div>` : ""}

            <div class="hero">
              <div class="panel">
                <div class="section-title">
                  <span>Decyzja systemu</span>
                  <ha-icon icon="mdi:state-machine"></ha-icon>
                </div>

                <div class="mode-card ${modeClass}">
                  <div class="mode-line">
                    <div>
                      <div class="mode-name">${this.esc(modeLabel)}</div>
                      <div class="mode-code">${this.esc(modeRaw)}</div>
                    </div>
                    <div class="mode-dot"></div>
                  </div>
                  <div class="decision">${this.esc(reason)}</div>
                </div>

                <div class="soc-block">
                  <div class="soc-top">
                    <div>
                      <div class="soc-value">${soc.toFixed(0)}%</div>
                      <div class="soc-label">Stan magazynu energii</div>
                    </div>
                    <div class="chip muted"><ha-icon icon="mdi:battery-sync"></ha-icon>${this.esc(this.st("batteryStatus"))}</div>
                  </div>

                  <div class="soc-bar">
                    <div class="soc-fill"></div>
                    <div class="soc-marker charge"></div>
                    <div class="soc-marker discharge"></div>
                    <div class="soc-marker morning"></div>
                  </div>

                  <div class="target-list">
                    <div>Cel ładowania: <b>${this.fmt("chargeTarget")}</b></div>
                    <div>Cel rozładowania: <b>${this.fmt("dischargeTarget")}</b></div>
                    <div>Cel poranny: <b>${this.fmt("morningTarget")}</b></div>
                    <div>Rezerwa nocna: <b>${this.fmt("nightReserve")}</b></div>
                  </div>
                </div>

                <div class="metrics" style="margin-top:14px;">
                  ${this.metric("Moc baterii", this.fmt("batteryPower"), this.esc(this.st("batteryStatus")), "mdi:battery")}
                  ${this.metric("Do sprzedaży", this.fmt("availableSell"), "energia ponad cel", "mdi:cash-fast")}
                  ${this.metric("Wolne miejsce", this.fmt("freeSpace"), "miejsce na PV/tani zakup", "mdi:battery-outline")}
                  ${this.metric("Do celu", this.fmt("chargeToTarget"), "brakuje do celu ładowania", "mdi:battery-clock")}
                </div>
              </div>

              <div class="flow">
                <div class="section-title">
                  <span>Przepływ energii</span>
                  <ha-icon icon="mdi:transmission-tower-export"></ha-icon>
                </div>

                <div class="flow-line line-v pv-home ${pvPower > 20 ? "" : "idle"}"></div>
                <div class="flow-line line-h grid-home ${Math.abs(gridPower) > 20 ? "" : "idle"} ${String(this.st("gridStatus")).toLowerCase().includes("eksport") ? "reverse" : ""}"></div>
                <div class="flow-line line-h home-battery ${Math.abs(batteryPower) > 20 ? "" : "idle"} ${String(this.st("batteryStatus")).toLowerCase().includes("roz") ? "reverse" : ""}"></div>
                <div class="flow-line line-v home-inverter ${this.num("inverterSelf", 0) > 10 ? "" : "idle"}"></div>

                <div class="flow-grid">
                  <div class="flow-node flow-pv">
                    <ha-icon icon="mdi:solar-power"></ha-icon>
                    <div class="flow-name">PV</div>
                    <div class="flow-value">${this.fmt("pvPower")}</div>
                    <div class="flow-sub">prognoza jutro: ${this.fmt("pvTomorrow", 1)}</div>
                  </div>

                  <div class="flow-node flow-gridnode">
                    <ha-icon icon="mdi:transmission-tower"></ha-icon>
                    <div class="flow-name">Sieć</div>
                    <div class="flow-value">${this.fmt("gridPower")}</div>
                    <div class="flow-sub">${this.esc(this.st("gridStatus"))}</div>
                  </div>

                  <div class="flow-node main flow-home">
                    <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
                    <div class="flow-name">Dom</div>
                    <div class="flow-value">${this.fmt("loadPower")}</div>
                    <div class="flow-sub">średnio: ${this.fmt("learnAvgLoad")}</div>
                  </div>

                  <div class="flow-node flow-battery">
                    <ha-icon icon="mdi:battery-high"></ha-icon>
                    <div class="flow-name">Magazyn</div>
                    <div class="flow-value">${soc.toFixed(0)}%</div>
                    <div class="flow-sub">${this.fmt("batteryPower")}</div>
                  </div>

                  <div class="flow-node flow-inverter">
                    <ha-icon icon="mdi:inverter"></ha-icon>
                    <div class="flow-name">Falownik</div>
                    <div class="flow-value">${this.fmt("inverterSelf")}</div>
                    <div class="flow-sub">pobór własny / straty</div>
                  </div>
                </div>
              </div>

              <div class="panel">
                <div class="section-title">
                  <span>Rynek energii</span>
                  <ha-icon icon="mdi:cash-clock"></ha-icon>
                </div>

                <div class="metrics">
                  ${this.metric("Zakup teraz", this.fmt("buyPrice", 3), "cena dynamiczna", "mdi:cash-plus")}
                  ${this.metric("Sprzedaż teraz", this.fmt("sellPrice", 3), "aktualna cena", "mdi:cash-minus")}
                  ${this.metric("Najlepsza sprzedaż", this.fmt("bestSellPrice", 3), this.esc(this.st("bestSellTime")), "mdi:clock-star-four-points")}
                  ${this.metric("Następna lepsza", this.fmt("nextBetterSellPrice", 3), this.esc(this.st("nextBetterSellTime")), "mdi:clock-fast")}
                  ${this.metric("Różnica do top", this.fmt("sellDelta", 3), "ile brakuje do najlepszej ceny", "mdi:delta")}
                  ${this.metric("Prognoza dziś", this.fmt("pvToday", 1), "pozostała produkcja", "mdi:weather-sunny")}
                </div>

                <div class="section-title" style="margin-top:16px;">
                  <span>Nastawy falownika</span>
                  <ha-icon icon="mdi:tune"></ha-icon>
                </div>

                <div class="metrics">
                  ${this.metric("Eksport max", this.fmt("inverterExportTarget", 0), "limit HomeOn", "mdi:transmission-tower-export")}
                  ${this.metric("Ładowanie", this.fmt("inverterChargeCurrent", 0), "prąd ładowania", "mdi:battery-arrow-up")}
                  ${this.metric("Rozładowanie", this.fmt("inverterDischargeCurrent", 0), "prąd pracy", "mdi:battery-arrow-down")}
                  ${this.metric("Tryb bezpieczny", this.fmt("inverterSafeDischargeCurrent", 0), "gdy EMS czeka", "mdi:battery-lock")}
                </div>
              </div>
            </div>

            <div class="learn">
              <div class="learn-card">
                <div class="section-title">
                  <span>Model zużycia domu</span>
                  <ha-icon icon="mdi:brain"></ha-icon>
                </div>

                <div class="confidence">
                  <div class="confidence-num">${confidence.toFixed(0)}%</div>
                  <div class="confidence-text">
                    Pewność nauki rośnie wraz z czasem obserwacji. Po dobie EMS zaczyna mieć sensowny profil zużycia dzień/noc.
                  </div>
                  <div class="confidence-bar"><div class="confidence-fill"></div></div>
                </div>

                <div class="learn-rows" style="margin-top:14px;">
                  ${this.row("Czas nauki", this.fmt("learnHours", 1))}
                  ${this.row("Próbki", this.fmt("learnSamples", 0))}
                  ${this.row("Ostatnia aktualizacja", this.esc(this.st("learnLastUpdate")))}
                  ${this.row("Najczęstszy tryb EMS", this.esc(this.st("learnMostMode")))}
                </div>
              </div>

              <div class="learn-card">
                <div class="section-title">
                  <span>Zużycie i rezerwa</span>
                  <ha-icon icon="mdi:home-analytics"></ha-icon>
                </div>

                <div class="learn-rows">
                  ${this.row("Średnie zużycie domu", this.fmt("learnAvgLoad"), this.bar(avgLoad, Math.max(avgLoad, avgDay, avgNight, 1)))}
                  ${this.row("Średnie zużycie w dzień", this.fmt("learnAvgDayLoad"), this.bar(avgDay, Math.max(avgLoad, avgDay, avgNight, 1)))}
                  ${this.row("Średnie zużycie w nocy", this.fmt("learnAvgNightLoad"), this.bar(avgNight, Math.max(avgLoad, avgDay, avgNight, 1)))}
                  ${this.row("Szacowane zużycie dobowe", this.fmt("learnDailyKwh", 2), this.bar(dailyKwh, Math.max(dailyKwh, 1)))}
                  ${this.row("Szacowane zużycie nocne", this.fmt("learnNightKwh", 2), this.bar(nightKwh, Math.max(dailyKwh, 1)))}
                </div>
              </div>

              <div class="learn-card">
                <div class="section-title">
                  <span>Bilans od startu nauki</span>
                  <ha-icon icon="mdi:chart-bar"></ha-icon>
                </div>

                <div class="learn-rows">
                  ${this.row("Energia domu", this.fmt("learnEnergyLoad", 2), this.bar(energyLoad, maxEnergy))}
                  ${this.row("Energia PV", this.fmt("learnEnergyPv", 2), this.bar(energyPv, maxEnergy))}
                  ${this.row("Import z sieci", this.fmt("learnEnergyImport", 2), this.bar(energyImport, maxEnergy))}
                  ${this.row("Eksport do sieci", this.fmt("learnEnergyExport", 2), this.bar(energyExport, maxEnergy))}
                  ${this.row("Pobór własny falownika", this.fmt("learnEnergyInverterSelf", 2))}
                </div>
              </div>

              <div class="learn-card">
                <div class="section-title">
                  <span>Ceny i sterowanie</span>
                  <ha-icon icon="mdi:currency-usd"></ha-icon>
                </div>

                <div class="learn-rows">
                  ${this.row("Średnia cena zakupu", this.fmt("learnAvgBuy", 3))}
                  ${this.row("Średnia cena sprzedaży", this.fmt("learnAvgSell", 3))}
                  ${this.row("Najlepsza zauważona cena", this.fmt("learnBestSellSeen", 3))}
                </div>

                <div class="action-box" style="margin-top:13px;">
                  <b>Akcja falownika</b><br>
                  ${this.esc(this.st("inverterControlAction"))}
                </div>

                <div class="action-box" style="margin-top:10px;">
                  <b>Wynik ostatniej próby</b><br>
                  ${this.esc(this.st("inverterControlResult"))}
                </div>
              </div>
            </div>

            <div class="panel" style="margin-top:14px;">
              <div class="section-title">
                <span>Plan następnych 24h</span>
                <ha-icon icon="mdi:calendar-clock"></ha-icon>
              </div>

              <div class="metrics">
                ${this.metric("Następna akcja", this.esc(this.st("planNextAction")), this.esc(this.st("planNextActionTime")), "mdi:calendar-arrow-right")}
                ${this.metric("Zalecany SOC", this.fmt("planRecommendedSoc", 1), this.esc(this.st("planPhase")), "mdi:battery-check")}
                ${this.metric("Tanie ładowanie", this.esc(this.st("planChargeWindow")), "najlepsze okno zakupu", "mdi:battery-clock")}
                ${this.metric("Najlepsza sprzedaż", this.esc(this.st("planSellWindow")), "najlepsze okno sprzedaży", "mdi:cash-clock")}
                ${this.metric("Pogoda jutro", this.esc(this.st("planWeatherTomorrow")), "PV: " + this.fmt("planPvTomorrow", 2), "mdi:weather-partly-cloudy")}
                ${this.metric("Bezpieczna sprzedaż", this.fmt("planSafeToSell", 2), "limit: " + this.fmt("planSafeExportLimit", 0), "mdi:cash-check")}
                ${this.metric("Zostawić energię", this.fmt("planEnergyToKeep", 2), this.esc(this.st("planReasonableBuyWindow")), "mdi:battery-lock")}
                ${this.metric("Bilans jutro", this.fmt("planEnergyBalanceTomorrow", 2), "PV minus zużycie", "mdi:scale-balance")}
                ${this.metric("Zużycie nocne", this.fmt("planNightKwh", 2), "prognoza z profilu domu", "mdi:weather-night")}
                ${this.metric("Zużycie 24h", this.fmt("planDayKwh", 2), "prognoza z profilu godzinowego", "mdi:calendar-today")}
              </div>

              <div class="action-box" style="margin-top:13px;">
                <b>Powód planu</b><br>
                ${this.esc(this.st("planNextActionReason"))}
              </div>

              <div class="action-box" style="margin-top:10px;">
                <b>Podsumowanie 24h</b><br>
                ${this.esc(this.st("planOverview"))}
              </div>

              <div class="action-box" style="margin-top:10px;">
                <b>Strategia pogoda / PV</b><br>
                ${this.esc(this.st("planWeatherStrategy"))}
              </div>
            </div>

            <div class="footer-grid">
              <div class="panel">
                <div class="section-title">
                  <span>Szybki stan mocy</span>
                  <ha-icon icon="mdi:flash"></ha-icon>
                </div>

                <div class="metrics">
                  ${this.metric("PV", this.fmt("pvPower"), pvPower > 20 ? "produkcja aktywna" : "brak produkcji", "mdi:solar-power")}
                  ${this.metric("Dom", this.fmt("loadPower"), "aktualne zużycie", "mdi:home-lightning-bolt")}
                  ${this.metric("Sieć", this.fmt("gridPower"), this.esc(this.st("gridStatus")), "mdi:transmission-tower")}
                  ${this.metric("Bateria", this.fmt("batteryPower"), this.esc(this.st("batteryStatus")), "mdi:battery")}
                </div>
              </div>

              <div class="panel">
                <div class="section-title">
                  <span>Tryb testów</span>
                  <ha-icon icon="mdi:shield-check"></ha-icon>
                </div>

                <div class="action-box">
                  EMS: <b>${this.esc(this.boolText("enabled"))}</b><br>
                  Dry-run: <b>${this.esc(this.boolText("dryRun"))}</b><br>
                  Sterowanie falownikiem: <b>${this.esc(this.boolText("inverterControl"))}</b><br>
                  Limit eksportu: <b>${this.fmt("inverterExportTarget", 0)}</b><br>
                  Blokada rozładowania: <b>${this.fmt("inverterBlockDischargeCurrent", 0)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get("homeon-energy-card")) {
  customElements.define("homeon-energy-card", HomeOnEnergyCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "homeon-energy-card",
  name: "HomeOn Energy Card",
  description: "Panel HomeOn Energy Manager z prognozą PV i sprzedażą bezpiecznej nadwyżki."
});
