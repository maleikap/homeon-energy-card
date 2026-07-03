class HomeOnEnergyCard extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
    this.title = this.config.title || "HomeOn Energy Dashboard";
    this.logo = this.config.logo || "/hacsfiles/homeon-energy-card/homeon_logo.svg?v=024";
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    return 12;
  }

  norm(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  defs() {
    return {
      mode: { label: "Tryb EMS", icon: "mdi:state-machine", find: ["tryb ems"] },
      reason: { label: "Decyzja EMS", icon: "mdi:text-box-check", find: ["decyzja ems"] },

      enabled: { label: "HomeOn włączony", icon: "mdi:power", find: ["homeon wlaczony"], domain: "switch" },
      dryRun: { label: "Tryb testowy", icon: "mdi:test-tube", find: ["tryb testowy dry run"], domain: "switch" },
      inverterControl: { label: "Sterowanie falownikiem", icon: "mdi:inverter", find: ["sterowanie falownikiem"], domain: "switch" },

      soc: { label: "SOC magazynu", icon: "mdi:battery", find: ["soc magazynu"] },
      batteryCapacity: { label: "Pojemność baterii", icon: "mdi:battery-high", find: ["pojemnosc baterii", "pojemnosc magazynu"] },
      emergencySoc: { label: "Awaryjny SOC", icon: "mdi:battery-alert", find: ["awaryjny soc"] },
      minSoc: { label: "Minimalny SOC", icon: "mdi:battery-low", find: ["minimalny soc"] },

      chargeTarget: { label: "Cel ładowania", icon: "mdi:battery-plus", find: ["cel ladowania"] },
      dischargeTarget: { label: "Cel rozładowania", icon: "mdi:battery-minus", find: ["cel rozladowania"] },
      morningTarget: { label: "Cel poranny", icon: "mdi:weather-sunset-up", find: ["cel poranny"] },
      nightReserve: { label: "Rezerwa nocna", icon: "mdi:weather-night", find: ["rezerwa nocna"] },

      targetSource: { label: "Źródło obliczeń celu", icon: "mdi:brain", find: ["cel zrodlo obliczen"] },
      targetLearningWeight: { label: "Udział nauki w celu", icon: "mdi:percent", find: ["cel udzial nauki"] },
      targetNightKwh: { label: "Zużycie nocne", icon: "mdi:weather-night", find: ["cel prognoza zuzycia nocnego"] },
      targetDayKwh: { label: "Zużycie 24h", icon: "mdi:calendar-today", find: ["cel prognoza zuzycia 24h"] },
      targetPvCoverage: { label: "Pokrycie PV jutro", icon: "mdi:solar-power", find: ["cel pokrycie pv jutro"] },
      targetReserveKwh: { label: "Wymagana rezerwa", icon: "mdi:battery-lock", find: ["cel wymagana rezerwa energii"] },
      targetReason: { label: "Powód obliczeń celu", icon: "mdi:text-box-check", find: ["cel powod obliczen"] },

      batteryPower: { label: "Moc baterii", icon: "mdi:battery-sync", find: ["moc baterii"] },
      batteryStatus: { label: "Status baterii", icon: "mdi:battery-clock", find: ["status baterii"] },
      batteryCharge: { label: "Ładowanie baterii", icon: "mdi:battery-arrow-up", find: ["ladowanie baterii"] },
      batteryDischarge: { label: "Rozładowanie baterii", icon: "mdi:battery-arrow-down", find: ["rozladowanie baterii"] },

      pvPower: { label: "Moc PV", icon: "mdi:solar-power", find: ["moc pv"] },
      loadPower: { label: "Moc domu", icon: "mdi:home-lightning-bolt", find: ["moc domu"] },
      gridPower: { label: "Moc sieci", icon: "mdi:transmission-tower", find: ["moc sieci"] },
      gridStatus: { label: "Status sieci", icon: "mdi:transmission-tower-export", find: ["status sieci"] },
      gridImport: { label: "Import z sieci", icon: "mdi:transmission-tower-import", find: ["import z sieci"] },
      gridExport: { label: "Eksport do sieci", icon: "mdi:transmission-tower-export", find: ["eksport do sieci"] },
      inverterSelf: { label: "Pobór własny falownika", icon: "mdi:inverter", find: ["pobor wlasny falownika"] },

      buyPrice: { label: "Cena zakupu", icon: "mdi:cash-plus", find: ["cena zakupu"] },
      sellPrice: { label: "Cena sprzedaży", icon: "mdi:cash-minus", find: ["cena sprzedazy"] },
      bestSellPrice: { label: "Najlepsza cena sprzedaży 24h", icon: "mdi:cash-check", find: ["najlepsza cena sprzedazy 24h"] },
      bestSellTime: { label: "Godzina najlepszej sprzedaży", icon: "mdi:clock-star-four-points", find: ["godzina najlepszej sprzedazy"] },
      nextBetterSellPrice: { label: "Następna lepsza cena", icon: "mdi:cash-clock", find: ["nastepna lepsza cena sprzedazy"] },
      nextBetterSellTime: { label: "Godzina lepszej ceny", icon: "mdi:clock-fast", find: ["godzina nastepnej lepszej sprzedazy"] },
      sellDelta: { label: "Różnica do najlepszej ceny", icon: "mdi:delta", find: ["roznica do najlepszej ceny"] },

      pvToday: { label: "Prognoza PV dziś", icon: "mdi:solar-power-variant", find: ["prognoza pv dzis"] },
      pvTomorrow: { label: "Prognoza PV jutro", icon: "mdi:solar-power-variant-outline", find: ["prognoza pv jutro"] },

      availableSell: { label: "Energia dostępna do sprzedaży", icon: "mdi:battery-arrow-down-outline", find: ["energia dostepna do sprzedazy"] },
      freeSpace: { label: "Wolne miejsce w magazynie", icon: "mdi:battery-outline", find: ["wolne miejsce w magazynie"] },
      chargeToTarget: { label: "Energia do celu ładowania", icon: "mdi:battery-plus-outline", find: ["energia do celu ladowania"] },
      aboveMorning: { label: "Energia ponad cel poranny", icon: "mdi:battery-clock-outline", find: ["energia ponad cel poranny"] },

      inverterExportTarget: { label: "Maksymalny eksport", icon: "mdi:transmission-tower-export", find: ["maksymalny eksport"] },
      inverterChargeCurrent: { label: "Prąd ładowania", icon: "mdi:current-dc", find: ["prad ladowania"] },
      inverterDischargeCurrent: { label: "Prąd rozładowania", icon: "mdi:current-dc", find: ["prad rozladowania"] },
      inverterSafeDischargeCurrent: { label: "Bezpieczny prąd rozładowania", icon: "mdi:shield-check", find: ["bezpieczny prad rozladowania"] },
      inverterBlockDischargeCurrent: { label: "Prąd blokady rozładowania", icon: "mdi:shield-lock", find: ["prad blokady rozladowania"] },

      inverterAction: { label: "Akcja falownika", icon: "mdi:play-network", find: ["akcja falownika"] },
      inverterResult: { label: "Wynik sterowania falownikiem", icon: "mdi:check-network", find: ["wynik sterowania falownikiem"] },
      inverterExecutorMode: { label: "Tryb wykonawczy", icon: "mdi:state-machine", find: ["sterowanie tryb wykonawczy"] },
      inverterSafeExportLimit: { label: "Bezpieczny limit eksportu", icon: "mdi:transmission-tower-export", find: ["sterowanie bezpieczny limit eksportu"] },
      inverterSafeToSell: { label: "Bezpieczna energia do sprzedaży", icon: "mdi:cash-check", find: ["sterowanie bezpieczna energia do sprzedazy"] },
      inverterWeatherLock: { label: "Blokada pogodowa", icon: "mdi:weather-cloudy-alert", find: ["sterowanie blokada pogodowa"] },
      inverterLastRun: { label: "Ostatnie wykonanie", icon: "mdi:clock-check", find: ["sterowanie ostatnie wykonanie"] },
      inverterConfigSource: { label: "Źródło konfiguracji falownika", icon: "mdi:cog", find: ["falownik zrodlo konfiguracji"] },
      inverterDryRunSensor: { label: "Falownik dry-run", icon: "mdi:test-tube", find: ["falownik dry run"] },

      inverterEntityGridCharging: { label: "Encja ładowania z sieci", icon: "mdi:toggle-switch", find: ["falownik encja ladowania z sieci"] },
      inverterEntityExportSurplus: { label: "Encja eksportu nadwyżki", icon: "mdi:toggle-switch", find: ["falownik encja eksportu nadwyzki"] },
      inverterEntityExportPower: { label: "Encja mocy eksportu", icon: "mdi:numeric", find: ["falownik encja mocy eksportu"] },
      inverterEntityChargeCurrent: { label: "Encja prądu ładowania", icon: "mdi:numeric", find: ["falownik encja pradu ladowania"] },
      inverterEntityDischargeCurrent: { label: "Encja prądu rozładowania", icon: "mdi:numeric", find: ["falownik encja pradu rozladowania"] },

      planPhase: { label: "Faza dnia", icon: "mdi:weather-partly-cloudy", find: ["plan faza dnia"] },
      planRecommendedSoc: { label: "Zalecany SOC", icon: "mdi:battery-check", find: ["plan zalecany soc"] },
      planNextAction: { label: "Następna akcja", icon: "mdi:arrow-decision", find: ["plan nastepna akcja"] },
      planNextActionTime: { label: "Czas następnej akcji", icon: "mdi:clock-outline", find: ["plan godzina nastepnej akcji"] },
      planNextActionReason: { label: "Powód następnej akcji", icon: "mdi:text-box-search", find: ["plan powod nastepnej akcji"] },
      planChargeWindow: { label: "Okno taniego ładowania", icon: "mdi:battery-clock", find: ["plan okno taniego ladowania"] },
      planSellWindow: { label: "Okno najlepszej sprzedaży", icon: "mdi:cash-clock", find: ["plan okno najlepszej sprzedazy"] },
      planHoldReason: { label: "Powód trzymania energii", icon: "mdi:battery-lock", find: ["plan powod trzymania energii"] },
      planNightKwh: { label: "Plan zużycie nocne", icon: "mdi:weather-night", find: ["plan prognoza zuzycia nocnego"] },
      planDayKwh: { label: "Plan zużycie 24h", icon: "mdi:calendar-today", find: ["plan prognoza zuzycia 24h"] },
      planCheapestBuy: { label: "Najtańsza cena zakupu", icon: "mdi:cash-plus", find: ["plan najtansza cena zakupu"] },
      planBestSell: { label: "Najlepsza cena sprzedaży", icon: "mdi:cash-minus", find: ["plan najlepsza cena sprzedazy"] },
      planOverview: { label: "Podsumowanie planu 24h", icon: "mdi:view-dashboard", find: ["plan 24h podsumowanie"] },
      planWeatherTomorrow: { label: "Pogoda / PV jutro", icon: "mdi:weather-cloudy-clock", find: ["plan pogoda jutro"] },
      planPvTomorrow: { label: "Plan PV jutro", icon: "mdi:solar-power", find: ["plan prognoza pv jutro"] },
      planEnergyBalanceTomorrow: { label: "Bilans energii jutro", icon: "mdi:scale-balance", find: ["plan bilans energii jutro"] },
      planEnergyToKeep: { label: "Energia do zostawienia", icon: "mdi:battery-lock", find: ["plan energia do zostawienia"] },
      planSafeToSell: { label: "Bezpieczna energia do sprzedaży", icon: "mdi:cash-check", find: ["plan bezpieczna energia do sprzedazy"] },
      planSafeExportLimit: { label: "Bezpieczny limit eksportu", icon: "mdi:transmission-tower-export", find: ["plan bezpieczny limit eksportu"] },
      planWeatherStrategy: { label: "Strategia pogodowa", icon: "mdi:weather-cloudy-alert", find: ["plan strategia pogoda"] },
      planReasonableBuyWindow: { label: "Okno normalnego zakupu", icon: "mdi:cash-clock", find: ["plan okno normalnego zakupu"] },

      learnSamples: { label: "Próbki nauki", icon: "mdi:counter", find: ["ems probki nauki"] },
      learnHours: { label: "Czas nauki", icon: "mdi:clock-outline", find: ["ems czas nauki"] },
      learnConfidence: { label: "Pewność nauki", icon: "mdi:brain", find: ["ems pewnosc nauki"] },
      learnLastUpdate: { label: "Ostatnia nauka", icon: "mdi:update", find: ["ems ostatnia nauka"] },
      learnAvgLoad: { label: "Średnie zużycie domu", icon: "mdi:home-lightning-bolt", find: ["ems srednie zuzycie domu"] },
      learnAvgDayLoad: { label: "Średnie zużycie dzień", icon: "mdi:white-balance-sunny", find: ["ems srednie zuzycie dzien"] },
      learnAvgNightLoad: { label: "Średnie zużycie noc", icon: "mdi:weather-night", find: ["ems srednie zuzycie noc"] },
      learnDailyKwh: { label: "Szacowane zużycie dobowe", icon: "mdi:calendar-today", find: ["ems szacowane zuzycie dobowe"] },
      learnNightKwh: { label: "Szacowane zużycie nocne", icon: "mdi:weather-night", find: ["ems szacowane zuzycie nocne"] },
      learnAvgPv: { label: "Średnia produkcja PV", icon: "mdi:solar-power", find: ["ems srednia produkcja pv"] },
      learnAvgImport: { label: "Średni import", icon: "mdi:transmission-tower-import", find: ["ems sredni import"] },
      learnAvgExport: { label: "Średni eksport", icon: "mdi:transmission-tower-export", find: ["ems sredni eksport"] },
      learnAvgBatteryCharge: { label: "Średnie ładowanie baterii", icon: "mdi:battery-arrow-up", find: ["ems srednie ladowanie baterii"] },
      learnAvgBatteryDischarge: { label: "Średnie rozładowanie baterii", icon: "mdi:battery-arrow-down", find: ["ems srednie rozladowanie baterii"] },
      learnAvgInverterSelf: { label: "Średni pobór falownika", icon: "mdi:inverter", find: ["ems sredni pobor falownika"] },
      learnEnergyLoad: { label: "Energia domu", icon: "mdi:home-lightning-bolt", find: ["ems energia domu"] },
      learnEnergyPv: { label: "Energia PV", icon: "mdi:solar-power", find: ["ems energia pv"] },
      learnEnergyImport: { label: "Energia import", icon: "mdi:transmission-tower-import", find: ["ems energia import"] },
      learnEnergyExport: { label: "Energia eksport", icon: "mdi:transmission-tower-export", find: ["ems energia eksport"] },
      learnEnergyBatteryCharge: { label: "Energia ładowania baterii", icon: "mdi:battery-arrow-up", find: ["ems energia ladowania baterii"] },
      learnEnergyBatteryDischarge: { label: "Energia rozładowania baterii", icon: "mdi:battery-arrow-down", find: ["ems energia rozladowania baterii"] },
      learnEnergyInverterSelf: { label: "Energia poboru falownika", icon: "mdi:inverter", find: ["ems energia poboru falownika"] },
      learnAvgBuy: { label: "Średnia cena zakupu", icon: "mdi:cash-plus", find: ["ems srednia cena zakupu"] },
      learnAvgSell: { label: "Średnia cena sprzedaży", icon: "mdi:cash-minus", find: ["ems srednia cena sprzedazy"] },
      learnBestSellSeen: { label: "Najlepsza zauważona sprzedaż", icon: "mdi:cash-star", find: ["ems najlepsza zauwazona cena sprzedazy"] },
      learnMostMode: { label: "Najczęstszy tryb", icon: "mdi:state-machine", find: ["ems najczestszy tryb"] },
      learnPeakHour: { label: "Godzina największego zużycia", icon: "mdi:chart-bell-curve", find: ["ems godzina najwiekszego zuzycia"] },
      learnPeakLoad: { label: "Największe godzinowe zużycie", icon: "mdi:chart-line", find: ["ems najwieksze godzinowe zuzycie"] },
      learnLowHour: { label: "Godzina najniższego zużycia", icon: "mdi:chart-bell-curve-cumulative", find: ["ems godzina najnizszego zuzycia"] },
      learnLowLoad: { label: "Najniższe godzinowe zużycie", icon: "mdi:chart-line-variant", find: ["ems najnizsze godzinowe zuzycie"] }
    };
  }

  findEntity(key) {
    const hass = this._hass;
    if (!hass) return null;

    const def = this.defs()[key] || {};
    const configured = this.config.entities && this.config.entities[key];
    if (configured && hass.states[configured]) return configured;

    const direct = this.config[key];
    if (direct && hass.states[direct]) return direct;

    const domain = def.domain || null;
    const findList = def.find || [];

    for (const pattern of findList) {
      const tokens = this.norm(pattern).split(" ").filter(Boolean);
      for (const [entityId, stateObj] of Object.entries(hass.states)) {
        if (domain && !entityId.startsWith(domain + ".")) continue;

        const friendly = this.norm(stateObj.attributes && stateObj.attributes.friendly_name);
        const entityNorm = this.norm(entityId);

        if (tokens.every((t) => friendly.includes(t)) || tokens.every((t) => entityNorm.includes(t))) {
          return entityId;
        }
      }
    }

    return null;
  }

  stateObj(key) {
    const id = this.findEntity(key);
    return id ? this._hass.states[id] : null;
  }

  value(key, fallback = "—") {
    const s = this.stateObj(key);
    if (!s) return fallback;

    const raw = s.state;
    if (raw === undefined || raw === null || raw === "" || raw === "unknown" || raw === "unavailable") {
      return fallback;
    }

    const unit = s.attributes && s.attributes.unit_of_measurement;
    return unit ? `${raw} ${unit}` : String(raw);
  }

  plain(key, fallback = "—") {
    const s = this.stateObj(key);
    if (!s) return fallback;
    const raw = s.state;
    if (raw === undefined || raw === null || raw === "" || raw === "unknown" || raw === "unavailable") return fallback;
    return String(raw);
  }

  num(key, fallback = 0) {
    const s = this.stateObj(key);
    if (!s) return fallback;
    const n = parseFloat(String(s.state).replace(",", "."));
    return Number.isFinite(n) ? n : fallback;
  }

  esc(text) {
    return String(text ?? "—")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  statusClass() {
    const mode = this.norm(this.plain("mode", ""));
    const reason = this.norm(this.plain("reason", ""));
    if (mode.includes("emergency") || mode.includes("awaryj")) return "danger";
    if (mode.includes("sell") || reason.includes("sprzed")) return "sell";
    if (mode.includes("charge") || reason.includes("ladu")) return "charge";
    if (mode.includes("weather") || reason.includes("pogod")) return "hold";
    if (mode.includes("normal")) return "ok";
    return "neutral";
  }

  icon(key) {
    const def = this.defs()[key] || {};
    return def.icon || "mdi:circle";
  }

  label(key) {
    const def = this.defs()[key] || {};
    return def.label || key;
  }

  tile(key, opts = {}) {
    const label = opts.label || this.label(key);
    const value = opts.value !== undefined ? opts.value : this.value(key);
    const icon = opts.icon || this.icon(key);
    const sub = opts.sub || "";
    const wide = opts.wide ? " wide" : "";
    const cls = opts.className || "";

    return `
      <div class="tile ${wide} ${cls}">
        <div class="tile-icon"><ha-icon icon="${icon}"></ha-icon></div>
        <div class="tile-body">
          <div class="tile-label">${this.esc(label)}</div>
          <div class="tile-value">${this.esc(value)}</div>
          ${sub ? `<div class="tile-sub">${this.esc(sub)}</div>` : ""}
        </div>
      </div>
    `;
  }

  section(title, subtitle, content) {
    return `
      <section class="section">
        <div class="section-head">
          <div>
            <h3>${this.esc(title)}</h3>
            ${subtitle ? `<p>${this.esc(subtitle)}</p>` : ""}
          </div>
        </div>
        ${content}
      </section>
    `;
  }

  grid(keys) {
    return `<div class="grid">${keys.map((k) => Array.isArray(k) ? this.tile(k[0], k[1]) : this.tile(k)).join("")}</div>`;
  }

  fmtW(n) {
    if (!Number.isFinite(n)) return "—";
    return `${Math.round(n).toLocaleString("pl-PL")} W`;
  }



  powerFlow() {
    const pv = Math.max(0, this.num("pvPower", 0));
    const load = Math.max(0, this.num("loadPower", 0));
    const gridImport = Math.max(0, this.num("gridImport", 0));
    const gridExport = Math.max(0, this.num("gridExport", 0));
    const batteryCharge = Math.max(0, this.num("batteryCharge", 0));
    const batteryDischarge = Math.max(0, this.num("batteryDischarge", 0));
    const inverterSelf = Math.max(0, this.num("inverterSelf", 0));

    const gridFlow = Math.max(gridImport, gridExport);
    const batteryFlow = Math.max(batteryCharge, batteryDischarge);

    const pvOn = pv > 25 ? " on" : "";
    const gridOn = gridFlow > 25 ? " on" : "";
    const batteryOn = batteryFlow > 25 ? " on" : "";

    const gridExportMode = gridExport > gridImport;
    const batteryDischargeMode = batteryDischarge > batteryCharge;

    const gridReverse = gridExportMode ? " reverse" : "";
    const batteryReverse = batteryDischargeMode ? " reverse" : "";

    const gridText = gridImport > gridExport ? "import z sieci" : gridExport > 25 ? "eksport do sieci" : "zero";
    const batteryText = batteryDischarge > batteryCharge ? "oddaje do domu" : batteryCharge > 25 ? "ładuje się" : "postój";

    return `
      <section class="pf-card">
        <div class="pf-head">
          <div>
            <h3>Przepływ energii</h3>
            <p>PV zawsze u góry, dom w środku, sieć po lewej, bateria po prawej. Kropki pokazują realny kierunek przepływu.</p>
          </div>
          <div class="pf-mode">${this.esc(this.value("mode"))}</div>
        </div>

        <div class="pf-board">
          <div class="pf-bg"></div>

          <div class="pf-node pf-pv">
            <div class="pf-orb pf-solar"><ha-icon icon="mdi:solar-power"></ha-icon></div>
            <strong>PV</strong>
            <b>${this.fmtW(pv)}</b>
          </div>

          <div class="pf-node pf-home">
            <div class="pf-orb pf-house"><ha-icon icon="mdi:home-lightning-bolt"></ha-icon></div>
            <strong>Dom</strong>
            <b>${this.fmtW(load)}</b>
            <small>zużycie teraz</small>
          </div>

          <div class="pf-node pf-grid">
            <div class="pf-orb pf-grid-icon"><ha-icon icon="mdi:transmission-tower"></ha-icon></div>
            <strong>Sieć</strong>
            <b>${this.fmtW(gridFlow)}</b>
            <small>${this.esc(gridText)}</small>
          </div>

          <div class="pf-node pf-battery">
            <div class="pf-orb pf-batt"><ha-icon icon="mdi:battery"></ha-icon></div>
            <strong>Bateria</strong>
            <b>${this.esc(this.value("soc"))}</b>
            <small>${this.esc(batteryText)}</small>
          </div>

          <div class="pf-line pf-line-pv${pvOn}">
            <span></span>
            <i class="d1"></i><i class="d2"></i><i class="d3"></i>
            <em>${this.fmtW(pv)}</em>
          </div>

          <div class="pf-line pf-line-grid${gridOn}${gridReverse}">
            <span></span>
            <i class="d1"></i><i class="d2"></i><i class="d3"></i>
            <em>${this.fmtW(gridFlow)}</em>
          </div>

          <div class="pf-line pf-line-battery${batteryOn}${batteryReverse}">
            <span></span>
            <i class="d1"></i><i class="d2"></i><i class="d3"></i>
            <em>${this.fmtW(batteryFlow)}</em>
          </div>

          <div class="pf-center-label">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span>Falownik</span>
            <b>${this.fmtW(inverterSelf)}</b>
          </div>
        </div>

        <div class="pf-summary">
          <div>
            <ha-icon icon="mdi:solar-power"></ha-icon>
            <span>PV</span>
            <b>${this.fmtW(pv)}</b>
          </div>
          <div>
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
            <span>Dom</span>
            <b>${this.fmtW(load)}</b>
          </div>
          <div>
            <ha-icon icon="mdi:battery-plus"></ha-icon>
            <span>Cel ładowania</span>
            <b>${this.esc(this.value("chargeTarget"))}</b>
          </div>
          <div>
            <ha-icon icon="mdi:cash-check"></ha-icon>
            <span>Do sprzedaży</span>
            <b>${this.esc(this.value("availableSell"))}</b>
          </div>
        </div>
      </section>
    `;
  }

  gauge() {
    const soc = Math.max(0, Math.min(100, this.num("soc", 0)));
    const charge = Math.max(0, Math.min(100, this.num("chargeTarget", 0)));
    const discharge = Math.max(0, Math.min(100, this.num("dischargeTarget", 0)));
    const morning = Math.max(0, Math.min(100, this.num("morningTarget", 0)));
    const night = Math.max(0, Math.min(100, this.num("nightReserve", 0)));

    return `
      <div class="gauge-card">
        <div class="gauge-top">
          <div>
            <div class="gauge-label">SOC magazynu</div>
            <div class="gauge-value">${Number.isFinite(soc) ? soc.toFixed(1) : "—"}%</div>
          </div>
          <div class="gauge-mini">
            <span>Cel ładowania <b>${Number.isFinite(charge) ? charge.toFixed(1) : "—"}%</b></span>
            <span>Cel rozładowania <b>${Number.isFinite(discharge) ? discharge.toFixed(1) : "—"}%</b></span>
          </div>
        </div>

        <div class="bar">
          <div class="bar-fill" style="width:${soc}%"></div>
          <div class="marker night" style="left:${night}%"><span>Noc</span></div>
          <div class="marker discharge" style="left:${discharge}%"><span>Min</span></div>
          <div class="marker morning" style="left:${morning}%"><span>Rano</span></div>
          <div class="marker charge" style="left:${charge}%"><span>Cel</span></div>
        </div>

        <div class="bar-legend">
          <span>Rezerwa nocna: ${this.value("nightReserve")}</span>
          <span>Cel poranny: ${this.value("morningTarget")}</span>
        </div>
      </div>
    `;
  }

  hero() {
    const cls = this.statusClass();

    return `
      <div class="hero ${cls}">
        <div class="hero-left">
          <div class="brand">
            <img src="${this.esc(this.logo)}" onerror="this.style.display='none'">
            <div>
              <div class="brand-title">${this.esc(this.title)}</div>
              <div class="brand-sub">EMS · bateria · falownik · rynek energii</div>
            </div>
          </div>

          <div class="mode-line">
            <span>${this.value("mode")}</span>
          </div>

          <div class="reason-line">
            ${this.value("reason")}
          </div>
        </div>

        <div class="hero-right">
          ${this.tile("soc")}
          ${this.tile("pvPower")}
          ${this.tile("loadPower")}
          ${this.tile("gridPower")}
        </div>
      </div>
    `;
  }

  render() {
    if (!this._hass) return;

    const inverterResult = this.value("inverterResult");
    const targetReason = this.value("targetReason");
    const planReason = this.value("planNextActionReason");
    const planStrategy = this.value("planWeatherStrategy");

    this.innerHTML = `
      <ha-card>
        <style>
          :host {
            --homeon-bg: var(--card-background-color, #fff);
            --homeon-border: rgba(127,127,127,.22);
            --homeon-muted: var(--secondary-text-color);
            --homeon-text: var(--primary-text-color);
            --homeon-accent: var(--primary-color);
            --homeon-radius: 18px;
            --flow-green: #22c55e;
            --flow-yellow: #facc15;
            --flow-blue: #38bdf8;
            --flow-purple: #a78bfa;
          }

          ha-card {
            overflow: hidden;
            border-radius: var(--homeon-radius);
          }

          .wrap {
            padding: 18px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .hero {
            border: 1px solid var(--homeon-border);
            border-radius: 22px;
            padding: 20px;
            display: grid;
            grid-template-columns: 1.1fr .9fr;
            gap: 16px;
            background: radial-gradient(circle at 8% 15%, rgba(56,189,248,.22), transparent 32%),
                        radial-gradient(circle at 88% 20%, rgba(34,197,94,.16), transparent 30%),
                        linear-gradient(135deg, rgba(50,120,255,.10), rgba(80,200,140,.07));
          }

          .hero.danger { background: linear-gradient(135deg, rgba(220,50,50,.20), rgba(255,170,0,.10)); }
          .hero.sell { background: linear-gradient(135deg, rgba(0,170,120,.20), rgba(0,120,255,.08)); }
          .hero.charge { background: linear-gradient(135deg, rgba(0,130,255,.18), rgba(80,200,140,.08)); }
          .hero.hold { background: linear-gradient(135deg, rgba(255,170,0,.18), rgba(0,120,255,.08)); }
          .hero.ok { background: linear-gradient(135deg, rgba(40,180,110,.16), rgba(0,120,255,.06)); }

          .brand {
            display: flex;
            align-items: center;
            gap: 18px;
            margin-bottom: 18px;
          }

          .brand img {
            width: 104px;
            height: 104px;
            border-radius: 24px;
            object-fit: contain;
            background: rgba(255,255,255,.08);
            padding: 6px;
            box-sizing: border-box;
          }

          .brand-title {
            font-size: 29px;
            font-weight: 900;
            letter-spacing: -.035em;
          }

          .brand-sub {
            color: var(--homeon-muted);
            font-size: 13px;
          }

          .mode-line {
            font-size: 30px;
            line-height: 1.15;
            font-weight: 900;
            letter-spacing: -.035em;
            margin-bottom: 10px;
          }

          .reason-line {
            color: var(--homeon-muted);
            font-size: 14px;
            line-height: 1.4;
            max-width: 720px;
          }

          .hero-right {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .energy-flow-card {
            border: 1px solid var(--homeon-border);
            border-radius: 22px;
            padding: 16px;
            background: radial-gradient(circle at 50% 35%, rgba(56,189,248,.10), transparent 38%),
                        linear-gradient(135deg, rgba(127,127,127,.045), rgba(127,127,127,.015));
          }

          .energy-flow-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 14px;
          }

          .energy-flow-head h3 {
            margin: 0;
            font-size: 19px;
            font-weight: 900;
            letter-spacing: -.02em;
          }

          .energy-flow-head p {
            margin: 4px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
          }

          .flow-mode-pill {
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 7px 11px;
            background: var(--homeon-bg);
            font-size: 12px;
            font-weight: 800;
            white-space: nowrap;
          }

          .flow-scene {
            position: relative;
            height: 430px;
            border-radius: 24px;
            border: 1px solid var(--homeon-border);
            background:
              radial-gradient(circle at 50% 50%, rgba(34,197,94,.10), transparent 32%),
              radial-gradient(circle at 50% 14%, rgba(250,204,21,.10), transparent 26%),
              var(--homeon-bg);
            overflow: hidden;
          }

          .flow-node {
            position: absolute;
            z-index: 5;
            width: 148px;
            min-height: 116px;
            border-radius: 22px;
            border: 1px solid var(--homeon-border);
            background: color-mix(in srgb, var(--homeon-bg) 92%, transparent);
            box-shadow: 0 14px 40px rgba(0,0,0,.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 5px;
            padding: 12px;
            box-sizing: border-box;
          }

          .flow-node strong {
            font-size: 14px;
            font-weight: 900;
          }

          .flow-node span {
            font-size: 17px;
            font-weight: 900;
          }

          .flow-node small {
            color: var(--homeon-muted);
            font-size: 11px;
          }

          .node-orb {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            color: white;
            box-shadow: 0 0 26px rgba(56,189,248,.22);
          }

          .node-orb ha-icon {
            width: 28px;
            height: 28px;
          }

          .node-orb.solar { background: linear-gradient(135deg, #facc15, #fb923c); }
          .node-orb.home { background: linear-gradient(135deg, #38bdf8, #2563eb); }
          .node-orb.battery { background: linear-gradient(135deg, #22c55e, #0f766e); }
          .node-orb.grid { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
          .node-orb.inverter { background: linear-gradient(135deg, #64748b, #0f172a); }

          .flow-pv { left: calc(50% - 74px); top: 18px; }
          .flow-home { left: calc(50% - 74px); top: 157px; min-height: 128px; }
          .flow-battery { left: 30px; top: 165px; }
          .flow-grid { right: 30px; top: 165px; }
          .flow-inverter { left: calc(50% - 74px); bottom: 18px; min-height: 98px; }

          .flow-line {
            position: absolute;
            z-index: 2;
            opacity: .22;
            background: rgba(127,127,127,.22);
            border-radius: 999px;
            overflow: visible;
          }

          .flow-line.active {
            opacity: 1;
          }

          .flow-line.vertical {
            left: calc(50% - 4px);
            top: 135px;
            width: 8px;
            height: 54px;
          }

          .flow-line.short {
            left: calc(50% - 4px);
            bottom: 115px;
            width: 8px;
            height: 48px;
          }

          .flow-line.horizontal {
            top: 222px;
            height: 8px;
          }

          .flow-line.battery-home {
            left: 178px;
            width: calc(50% - 252px);
          }

          .flow-line.home-grid {
            right: 178px;
            width: calc(50% - 252px);
          }

          .flow-line i {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--flow-blue);
            box-shadow: 0 0 16px var(--flow-blue);
            opacity: 0;
          }

          .flow-line.vertical i,
          .flow-line.short i {
            left: -2px;
            animation: dotDown 1.55s linear infinite;
          }

          .flow-line.horizontal i {
            top: -2px;
            animation: dotRight 1.65s linear infinite;
          }

          .flow-line.reverse i {
            animation-name: dotLeft;
          }

          .flow-line i:nth-child(2) { animation-delay: .45s; }
          .flow-line i:nth-child(3) { animation-delay: .9s; }

          .pv-home i { background: var(--flow-yellow); box-shadow: 0 0 18px var(--flow-yellow); }
          .battery-home i { background: var(--flow-green); box-shadow: 0 0 18px var(--flow-green); }
          .home-grid i { background: var(--flow-purple); box-shadow: 0 0 18px var(--flow-purple); }
          .inverter-home i { background: var(--flow-blue); box-shadow: 0 0 18px var(--flow-blue); }

          .flow-line:not(.active) i {
            animation-play-state: paused;
          }

          .flow-line em {
            position: absolute;
            font-style: normal;
            font-size: 11px;
            font-weight: 850;
            color: var(--homeon-muted);
            background: var(--homeon-bg);
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 4px 8px;
            white-space: nowrap;
          }

          .flow-line.vertical em {
            left: 16px;
            top: 16px;
          }

          .flow-line.short em {
            left: 16px;
            top: 12px;
          }

          .flow-line.horizontal em {
            left: 50%;
            top: -34px;
            transform: translateX(-50%);
          }

          @keyframes dotDown {
            0% { top: -12px; opacity: 0; }
            14% { opacity: 1; }
            86% { opacity: 1; }
            100% { top: calc(100% + 4px); opacity: 0; }
          }

          @keyframes dotRight {
            0% { left: -12px; opacity: 0; }
            14% { opacity: 1; }
            86% { opacity: 1; }
            100% { left: calc(100% + 4px); opacity: 0; }
          }

          @keyframes dotLeft {
            0% { left: calc(100% + 4px); opacity: 0; }
            14% { opacity: 1; }
            86% { opacity: 1; }
            100% { left: -12px; opacity: 0; }
          }

          .flow-summary {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            margin-top: 12px;
          }

          .flow-summary div {
            border: 1px solid var(--homeon-border);
            border-radius: 16px;
            padding: 11px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--homeon-bg);
            min-width: 0;
          }

          .flow-summary ha-icon {
            color: var(--homeon-accent);
            flex: 0 0 auto;
          }

          .flow-summary span {
            color: var(--homeon-muted);
            font-size: 12px;
            flex: 1;
            min-width: 0;
          }

          .flow-summary b {
            font-size: 13px;
            font-weight: 900;
            white-space: nowrap;
          }

          .section {
            border: 1px solid var(--homeon-border);
            border-radius: 18px;
            padding: 14px;
            background: rgba(127,127,127,.035);
          }

          .section-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
          }

          .section h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 800;
            letter-spacing: -.01em;
          }

          .section p {
            margin: 3px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
          }

          .tile {
            border: 1px solid var(--homeon-border);
            border-radius: 14px;
            padding: 11px;
            background: var(--homeon-bg);
            display: flex;
            gap: 10px;
            min-height: 58px;
            box-sizing: border-box;
          }

          .tile.wide {
            grid-column: span 4;
          }

          .tile-icon {
            color: var(--homeon-accent);
            flex: 0 0 auto;
            margin-top: 2px;
          }

          .tile-icon ha-icon {
            width: 22px;
            height: 22px;
          }

          .tile-body {
            min-width: 0;
          }

          .tile-label {
            color: var(--homeon-muted);
            font-size: 12px;
            line-height: 1.2;
            margin-bottom: 5px;
          }

          .tile-value {
            color: var(--homeon-text);
            font-size: 15px;
            font-weight: 750;
            line-height: 1.25;
            overflow-wrap: anywhere;
          }

          .tile-sub {
            margin-top: 4px;
            color: var(--homeon-muted);
            font-size: 11px;
            overflow-wrap: anywhere;
          }

          .gauge-card {
            border: 1px solid var(--homeon-border);
            border-radius: 18px;
            padding: 16px;
            background: var(--homeon-bg);
          }

          .gauge-top {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 14px;
          }

          .gauge-label {
            color: var(--homeon-muted);
            font-size: 13px;
          }

          .gauge-value {
            font-size: 34px;
            font-weight: 900;
            letter-spacing: -.04em;
          }

          .gauge-mini {
            display: flex;
            flex-direction: column;
            gap: 4px;
            color: var(--homeon-muted);
            font-size: 12px;
            text-align: right;
          }

          .gauge-mini b {
            color: var(--homeon-text);
          }

          .bar {
            height: 18px;
            border-radius: 999px;
            background: rgba(127,127,127,.16);
            position: relative;
            overflow: visible;
          }

          .bar-fill {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--homeon-accent), rgba(0,180,120,.95));
          }

          .marker {
            position: absolute;
            top: -6px;
            height: 30px;
            width: 2px;
            background: var(--homeon-text);
            opacity: .85;
          }

          .marker span {
            position: absolute;
            top: 31px;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 10px;
            color: var(--homeon-muted);
          }

          .bar-legend {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            margin-top: 22px;
            color: var(--homeon-muted);
            font-size: 12px;
          }

          .long-text {
            border: 1px solid var(--homeon-border);
            border-radius: 14px;
            padding: 12px;
            background: var(--homeon-bg);
            color: var(--homeon-text);
            font-size: 13px;
            line-height: 1.45;
            overflow-wrap: anywhere;
            margin-top: 10px;
          }

          .split {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }

          .footer {
            color: var(--homeon-muted);
            font-size: 11px;
            text-align: center;
            padding: 4px 0 0;
          }

          @media (max-width: 900px) {
            .hero {
              grid-template-columns: 1fr;
            }

            .grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .tile.wide {
              grid-column: span 2;
            }

            .split {
              grid-template-columns: 1fr;
            }

            .flow-scene {
              height: 650px;
            }

            .flow-pv { left: calc(50% - 74px); top: 18px; }
            .flow-home { left: calc(50% - 74px); top: 174px; }
            .flow-battery { left: calc(50% - 74px); top: 330px; }
            .flow-grid { left: calc(50% - 74px); right: auto; top: 470px; }
            .flow-inverter { left: calc(50% - 74px); bottom: 18px; display: none; }

            .flow-line {
              display: none;
            }

            .flow-summary {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 520px) {
            .wrap {
              padding: 12px;
            }

            .grid {
              grid-template-columns: 1fr;
            }

            .tile.wide {
              grid-column: span 1;
            }

            .hero-right {
              grid-template-columns: 1fr;
            }

            .brand {
              align-items: flex-start;
            }

            .brand img {
              width: 86px;
              height: 86px;
            }

            .brand-title {
              font-size: 23px;
            }

            .mode-line {
              font-size: 24px;
            }

            .gauge-top {
              flex-direction: column;
            }

            .gauge-mini {
              text-align: left;
            }

            .bar-legend {
              flex-direction: column;
            }
          }
          .brand img {
            width: 132px !important;
            height: 132px !important;
            border-radius: 28px !important;
            object-fit: contain !important;
            background: rgba(255,255,255,.10) !important;
            padding: 8px !important;
            box-sizing: border-box !important;
          }

          .brand-title {
            font-size: 33px !important;
            font-weight: 900 !important;
          }

          .rf-card {
            border: 1px solid var(--homeon-border);
            border-radius: 22px;
            padding: 18px;
            background:
              radial-gradient(circle at 50% 22%, rgba(250,204,21,.10), transparent 22%),
              radial-gradient(circle at 16% 75%, rgba(56,189,248,.08), transparent 24%),
              radial-gradient(circle at 84% 75%, rgba(34,197,94,.08), transparent 24%),
              linear-gradient(145deg, rgba(127,127,127,.04), rgba(127,127,127,.015));
          }

          .rf-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
            margin-bottom: 14px;
          }

          .rf-head h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: -.02em;
          }

          .rf-head p {
            margin: 4px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
          }

          .rf-mode {
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 7px 12px;
            background: var(--homeon-bg);
            font-size: 12px;
            font-weight: 800;
            white-space: nowrap;
          }

          .rf-shell {
            position: relative;
            height: 400px;
            border-radius: 26px;
            border: 1px solid var(--homeon-border);
            background:
              radial-gradient(circle at 50% 50%, rgba(34,197,94,.08), transparent 20%),
              radial-gradient(circle at 50% 50%, rgba(59,130,246,.05), transparent 34%),
              var(--homeon-bg);
            overflow: hidden;
          }

          .rf-glow {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 50% 47%, rgba(56,189,248,.10), transparent 18%),
              radial-gradient(circle at 50% 47%, rgba(34,197,94,.07), transparent 28%);
            pointer-events: none;
          }

          .rf-node {
            position: absolute;
            z-index: 5;
            width: 154px;
            min-height: 114px;
            border-radius: 22px;
            border: 1px solid var(--homeon-border);
            background: rgba(255,255,255,.72);
            backdrop-filter: blur(8px);
            box-shadow: 0 14px 34px rgba(0,0,0,.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 4px;
            padding: 12px;
            box-sizing: border-box;
          }

          .rf-name {
            font-size: 14px;
            font-weight: 800;
          }

          .rf-value {
            font-size: 16px;
            font-weight: 900;
          }

          .rf-sub {
            color: var(--homeon-muted);
            font-size: 11px;
          }

          .rf-orb {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            color: #fff;
            box-shadow: 0 0 24px rgba(0,0,0,.12);
          }

          .rf-orb ha-icon {
            width: 28px;
            height: 28px;
          }

          .rf-orb.solar { background: linear-gradient(135deg, #facc15, #fb923c); }
          .rf-orb.home { background: linear-gradient(135deg, #38bdf8, #2563eb); }
          .rf-orb.grid { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
          .rf-orb.battery { background: linear-gradient(135deg, #22c55e, #0f766e); }
          .rf-orb.inverter { background: linear-gradient(135deg, #475569, #0f172a); }

          .rf-pv {
            top: 18px;
            left: calc(50% - 77px);
          }

          .rf-home {
            top: 138px;
            left: calc(50% - 86px);
            width: 172px;
            min-height: 126px;
            box-shadow: 0 18px 44px rgba(59,130,246,.11);
          }

          .rf-home .rf-value {
            font-size: 18px;
          }

          .rf-grid {
            top: 146px;
            left: 58px;
          }

          .rf-battery {
            top: 146px;
            right: 58px;
          }

          .rf-inverter {
            bottom: 20px;
            left: calc(50% - 77px);
            min-height: 98px;
          }

          .rf-link {
            position: absolute;
            z-index: 2;
            opacity: .30;
          }

          .rf-link.on {
            opacity: 1;
          }

          .rf-track {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            background: rgba(148,163,184,.22);
          }

          .rf-link i {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            opacity: 0;
          }

          .rf-link em {
            position: absolute;
            font-style: normal;
            font-size: 11px;
            font-weight: 900;
            color: var(--homeon-muted);
            background: rgba(255,255,255,.9);
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 4px 8px;
            white-space: nowrap;
          }

          .rf-link:not(.on) i {
            display: none;
          }

          .rf-link-pv {
            left: calc(50% - 4px);
            top: 116px;
            width: 8px;
            height: 46px;
          }

          .rf-link-pv .rf-track {
            background: linear-gradient(180deg, rgba(250,204,21,.18), rgba(250,204,21,.65));
          }

          .rf-link-pv i {
            left: -2px;
            background: #facc15;
            box-shadow: 0 0 18px #facc15;
            animation: homeonDotDown 1.45s linear infinite;
          }

          .rf-link-pv i.p2 { animation-delay: .45s; }
          .rf-link-pv i.p3 { animation-delay: .9s; }
          .rf-link-pv em {
            left: 16px;
            top: 10px;
          }

          .rf-link-grid {
            left: 206px;
            top: 205px;
            width: calc(50% - 292px);
            height: 8px;
          }

          .rf-link-grid .rf-track {
            background: linear-gradient(90deg, rgba(167,139,250,.55), rgba(167,139,250,.18));
          }

          .rf-link-grid i {
            top: -2px;
            background: #a78bfa;
            box-shadow: 0 0 18px #a78bfa;
            animation: homeonDotRight 1.55s linear infinite;
          }

          .rf-link-grid.reverse i {
            animation-name: homeonDotLeft;
          }

          .rf-link-grid i.p2 { animation-delay: .45s; }
          .rf-link-grid i.p3 { animation-delay: .9s; }
          .rf-link-grid em {
            left: 50%;
            transform: translateX(-50%);
            top: -30px;
          }

          .rf-link-battery {
            right: 206px;
            top: 205px;
            width: calc(50% - 292px);
            height: 8px;
          }

          .rf-link-battery .rf-track {
            background: linear-gradient(90deg, rgba(34,197,94,.18), rgba(34,197,94,.60));
          }

          .rf-link-battery i {
            top: -2px;
            background: #22c55e;
            box-shadow: 0 0 18px #22c55e;
            animation: homeonDotRight 1.55s linear infinite;
          }

          .rf-link-battery.reverse i {
            animation-name: homeonDotLeft;
          }

          .rf-link-battery i.p2 { animation-delay: .45s; }
          .rf-link-battery i.p3 { animation-delay: .9s; }
          .rf-link-battery em {
            left: 50%;
            transform: translateX(-50%);
            top: -30px;
          }

          .rf-link-inverter {
            left: calc(50% - 4px);
            top: 265px;
            width: 8px;
            height: 58px;
          }

          .rf-link-inverter .rf-track {
            background: linear-gradient(180deg, rgba(71,85,105,.16), rgba(71,85,105,.56));
          }

          .rf-link-inverter i {
            left: -2px;
            background: #64748b;
            box-shadow: 0 0 16px #64748b;
            animation: homeonDotDown 1.65s linear infinite;
          }

          .rf-link-inverter i.p2 { animation-delay: .55s; }
          .rf-link-inverter em {
            left: 16px;
            top: 14px;
          }

          @keyframes homeonDotDown {
            0% { top: -10px; opacity: 0; }
            14% { opacity: 1; }
            86% { opacity: 1; }
            100% { top: calc(100% + 4px); opacity: 0; }
          }

          @keyframes homeonDotRight {
            0% { left: -10px; opacity: 0; }
            14% { opacity: 1; }
            86% { opacity: 1; }
            100% { left: calc(100% + 4px); opacity: 0; }
          }

          @keyframes homeonDotLeft {
            0% { left: calc(100% + 4px); opacity: 0; }
            14% { opacity: 1; }
            86% { opacity: 1; }
            100% { left: -10px; opacity: 0; }
          }

          .rf-bottom {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
            margin-top: 12px;
          }

          .rf-chip {
            border: 1px solid var(--homeon-border);
            border-radius: 15px;
            padding: 11px 12px;
            background: rgba(255,255,255,.65);
            backdrop-filter: blur(6px);
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .rf-chip ha-icon {
            color: var(--homeon-accent);
            flex: 0 0 auto;
          }

          .rf-chip span {
            color: var(--homeon-muted);
            font-size: 12px;
            flex: 1;
            min-width: 0;
          }

          .rf-chip b {
            font-size: 13px;
            font-weight: 900;
            white-space: nowrap;
          }

          @media (max-width: 980px) {
            .rf-shell {
              height: 650px;
            }

            .rf-pv { top: 18px; left: calc(50% - 77px); }
            .rf-home { top: 160px; left: calc(50% - 86px); }
            .rf-grid { top: 320px; left: calc(50% - 77px); }
            .rf-battery { top: 462px; right: auto; left: calc(50% - 77px); }
            .rf-inverter { display: none; }

            .rf-link {
              display: none;
            }

            .rf-bottom {
              grid-template-columns: 1fr;
            }
          }

          .brand img {
            width: 150px !important;
            height: 150px !important;
            min-width: 150px !important;
            min-height: 150px !important;
            border-radius: 30px !important;
            object-fit: contain !important;
            background: rgba(255,255,255,.12) !important;
            padding: 8px !important;
            box-sizing: border-box !important;
          }

          .brand-title {
            font-size: 34px !important;
            font-weight: 900 !important;
            letter-spacing: -.04em !important;
          }

          .pf-card {
            border: 1px solid var(--homeon-border);
            border-radius: 24px;
            padding: 18px;
            background:
              radial-gradient(circle at 50% 12%, rgba(250,204,21,.12), transparent 25%),
              radial-gradient(circle at 12% 60%, rgba(167,139,250,.10), transparent 24%),
              radial-gradient(circle at 88% 60%, rgba(34,197,94,.10), transparent 24%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015));
          }

          .pf-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
            margin-bottom: 14px;
          }

          .pf-head h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: -.02em;
          }

          .pf-head p {
            margin: 4px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
            line-height: 1.35;
          }

          .pf-mode {
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 7px 12px;
            background: var(--homeon-bg);
            font-size: 12px;
            font-weight: 850;
            white-space: nowrap;
          }

          .pf-board {
            position: relative;
            height: 360px;
            border-radius: 26px;
            border: 1px solid var(--homeon-border);
            background:
              radial-gradient(circle at 50% 50%, rgba(56,189,248,.10), transparent 20%),
              radial-gradient(circle at 50% 50%, rgba(34,197,94,.07), transparent 34%),
              var(--homeon-bg);
            overflow: hidden;
          }

          .pf-bg {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(90deg, transparent 0%, rgba(127,127,127,.04) 50%, transparent 100%),
              linear-gradient(180deg, transparent 0%, rgba(127,127,127,.04) 50%, transparent 100%);
            pointer-events: none;
          }

          .pf-node {
            position: absolute;
            z-index: 5;
            width: 150px;
            min-height: 112px;
            border-radius: 22px;
            border: 1px solid var(--homeon-border);
            background: color-mix(in srgb, var(--homeon-bg) 88%, transparent);
            box-shadow: 0 16px 38px rgba(0,0,0,.08);
            backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 4px;
            padding: 12px;
            box-sizing: border-box;
          }

          .pf-node strong {
            font-size: 14px;
            font-weight: 900;
          }

          .pf-node b {
            font-size: 17px;
            font-weight: 900;
          }

          .pf-node small {
            color: var(--homeon-muted);
            font-size: 11px;
          }

          .pf-orb {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            color: white;
            box-shadow: 0 0 26px rgba(0,0,0,.14);
          }

          .pf-orb ha-icon {
            width: 28px;
            height: 28px;
          }

          .pf-solar { background: linear-gradient(135deg, #facc15, #f97316); }
          .pf-house { background: linear-gradient(135deg, #38bdf8, #2563eb); }
          .pf-grid-icon { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
          .pf-batt { background: linear-gradient(135deg, #22c55e, #0f766e); }

          .pf-pv {
            top: 18px;
            left: calc(50% - 75px);
          }

          .pf-home {
            top: 130px;
            left: calc(50% - 82px);
            width: 164px;
            min-height: 126px;
            box-shadow: 0 20px 46px rgba(56,189,248,.12);
          }

          .pf-grid {
            top: 136px;
            left: 68px;
          }

          .pf-battery {
            top: 136px;
            right: 68px;
          }

          .pf-center-label {
            position: absolute;
            z-index: 6;
            left: calc(50% - 78px);
            bottom: 18px;
            width: 156px;
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 8px 11px;
            display: flex;
            align-items: center;
            gap: 7px;
            justify-content: center;
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent);
            color: var(--homeon-muted);
            box-shadow: 0 10px 28px rgba(0,0,0,.06);
          }

          .pf-center-label ha-icon {
            width: 18px;
            height: 18px;
          }

          .pf-center-label span {
            font-size: 12px;
          }

          .pf-center-label b {
            color: var(--homeon-text);
            font-size: 12px;
            font-weight: 900;
          }

          .pf-line {
            position: absolute;
            z-index: 2;
            opacity: .24;
          }

          .pf-line.on {
            opacity: 1;
          }

          .pf-line span {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            background: rgba(148,163,184,.22);
          }

          .pf-line i {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            opacity: 0;
          }

          .pf-line:not(.on) i {
            display: none;
          }

          .pf-line em {
            position: absolute;
            font-style: normal;
            font-size: 11px;
            font-weight: 900;
            color: var(--homeon-muted);
            background: color-mix(in srgb, var(--homeon-bg) 92%, transparent);
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 4px 8px;
            white-space: nowrap;
          }

          .pf-line-pv {
            left: calc(50% - 4px);
            top: 116px;
            width: 8px;
            height: 40px;
          }

          .pf-line-pv span {
            background: linear-gradient(180deg, rgba(250,204,21,.20), rgba(250,204,21,.72));
          }

          .pf-line-pv i {
            left: -2px;
            background: #facc15;
            box-shadow: 0 0 18px #facc15;
            animation: pfDotDown 1.35s linear infinite;
          }

          .pf-line-pv i.d2 { animation-delay: .42s; }
          .pf-line-pv i.d3 { animation-delay: .84s; }

          .pf-line-pv em {
            left: 16px;
            top: 8px;
          }

          .pf-line-grid {
            left: 218px;
            top: 194px;
            width: calc(50% - 300px);
            height: 8px;
          }

          .pf-line-grid span {
            background: linear-gradient(90deg, rgba(167,139,250,.68), rgba(167,139,250,.16));
          }

          .pf-line-grid i {
            top: -2px;
            background: #a78bfa;
            box-shadow: 0 0 18px #a78bfa;
            animation: pfDotRight 1.55s linear infinite;
          }

          .pf-line-grid.reverse i {
            animation-name: pfDotLeft;
          }

          .pf-line-grid i.d2 { animation-delay: .45s; }
          .pf-line-grid i.d3 { animation-delay: .9s; }

          .pf-line-grid em {
            left: 50%;
            top: -30px;
            transform: translateX(-50%);
          }

          .pf-line-battery {
            right: 218px;
            top: 194px;
            width: calc(50% - 300px);
            height: 8px;
          }

          .pf-line-battery span {
            background: linear-gradient(90deg, rgba(34,197,94,.16), rgba(34,197,94,.68));
          }

          .pf-line-battery i {
            top: -2px;
            background: #22c55e;
            box-shadow: 0 0 18px #22c55e;
            animation: pfDotRight 1.55s linear infinite;
          }

          .pf-line-battery.reverse i {
            animation-name: pfDotLeft;
          }

          .pf-line-battery i.d2 { animation-delay: .45s; }
          .pf-line-battery i.d3 { animation-delay: .9s; }

          .pf-line-battery em {
            left: 50%;
            top: -30px;
            transform: translateX(-50%);
          }

          @keyframes pfDotDown {
            0% { top: -10px; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: calc(100% + 5px); opacity: 0; }
          }

          @keyframes pfDotRight {
            0% { left: -10px; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { left: calc(100% + 5px); opacity: 0; }
          }

          @keyframes pfDotLeft {
            0% { left: calc(100% + 5px); opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { left: -10px; opacity: 0; }
          }

          .pf-summary {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
            margin-top: 12px;
          }

          .pf-summary div {
            border: 1px solid var(--homeon-border);
            border-radius: 16px;
            padding: 11px 12px;
            background: color-mix(in srgb, var(--homeon-bg) 88%, transparent);
            display: flex;
            gap: 8px;
            align-items: center;
            min-width: 0;
          }

          .pf-summary ha-icon {
            color: var(--homeon-accent);
            flex: 0 0 auto;
          }

          .pf-summary span {
            color: var(--homeon-muted);
            font-size: 12px;
            flex: 1;
            min-width: 0;
          }

          .pf-summary b {
            font-size: 13px;
            font-weight: 900;
            white-space: nowrap;
          }

          @media (max-width: 980px) {
            .brand img {
              width: 110px !important;
              height: 110px !important;
              min-width: 110px !important;
              min-height: 110px !important;
            }

            .pf-board {
              height: auto;
              min-height: 0;
              display: grid;
              grid-template-columns: 1fr;
              gap: 10px;
              padding: 12px;
              box-sizing: border-box;
            }

            .pf-node,
            .pf-pv,
            .pf-home,
            .pf-grid,
            .pf-battery {
              position: relative;
              top: auto;
              left: auto;
              right: auto;
              width: 100%;
              min-height: 88px;
            }

            .pf-center-label {
              position: relative;
              left: auto;
              bottom: auto;
              width: 100%;
              box-sizing: border-box;
            }

            .pf-line {
              display: none;
            }

            .pf-summary {
              grid-template-columns: 1fr;
            }
          }

        </style>

        <div class="wrap">
          ${this.hero()}

          ${this.powerFlow()}

          ${this.gauge()}

          <div class="split">
            ${this.section(
              "Cele baterii EMS",
              "Dlaczego HomeOn chce taki poziom magazynu.",
              this.grid([
                "targetSource",
                "targetLearningWeight",
                "targetNightKwh",
                "targetDayKwh",
                "targetPvCoverage",
                "targetReserveKwh",
                "nightReserve",
                "morningTarget",
                "chargeTarget",
                "dischargeTarget",
                "availableSell",
                "freeSpace"
              ]) + `<div class="long-text">${this.esc(targetReason)}</div>`
            )}

            ${this.section(
              "Sterowanie falownikiem",
              "Tryb testowy, komendy i encje Deye/Solarman.",
              this.grid([
                "enabled",
                "dryRun",
                "inverterControl",
                "inverterExecutorMode",
                "inverterSafeExportLimit",
                "inverterSafeToSell",
                "inverterWeatherLock",
                "inverterLastRun",
                "inverterExportTarget",
                "inverterChargeCurrent",
                "inverterDischargeCurrent",
                "inverterSafeDischargeCurrent"
              ]) + `<div class="long-text">${this.esc(inverterResult)}</div>`
            )}
          </div>

          ${this.section(
            "Przepływ energii — dane liczbowe",
            "Aktualny bilans domu, PV, sieci, baterii i falownika.",
            this.grid([
              "pvPower",
              "loadPower",
              "gridPower",
              "gridStatus",
              "gridImport",
              "gridExport",
              "batteryPower",
              "batteryStatus",
              "batteryCharge",
              "batteryDischarge",
              "inverterSelf",
              "pvTomorrow"
            ])
          )}

          <div class="split">
            ${this.section(
              "Rynek energii",
              "Ceny zakupu, sprzedaży i najlepsze okna.",
              this.grid([
                "buyPrice",
                "sellPrice",
                "bestSellPrice",
                "bestSellTime",
                "nextBetterSellPrice",
                "nextBetterSellTime",
                "sellDelta",
                "planCheapestBuy",
                "planBestSell",
                "planChargeWindow",
                "planSellWindow",
                "learnBestSellSeen"
              ])
            )}

            ${this.section(
              "Plan następnych 24h",
              "Planowanie energii, pogody i bezpiecznej sprzedaży.",
              this.grid([
                "planPhase",
                "planRecommendedSoc",
                "planNextAction",
                "planNextActionTime",
                "planNightKwh",
                "planDayKwh",
                "planWeatherTomorrow",
                "planPvTomorrow",
                "planEnergyBalanceTomorrow",
                "planEnergyToKeep",
                "planSafeToSell",
                "planSafeExportLimit"
              ]) + `<div class="long-text">${this.esc(planReason)}</div><div class="long-text">${this.esc(planStrategy)}</div>`
            )}
          </div>

          ${this.section(
            "Uczenie EMS",
            "Model zużycia domu i pewność obliczeń.",
            this.grid([
              "learnSamples",
              "learnHours",
              "learnConfidence",
              "learnLastUpdate",
              "learnAvgLoad",
              "learnAvgDayLoad",
              "learnAvgNightLoad",
              "learnDailyKwh",
              "learnNightKwh",
              "learnPeakHour",
              "learnPeakLoad",
              "learnLowHour",
              "learnLowLoad",
              "learnMostMode",
              "learnAvgBuy",
              "learnAvgSell"
            ])
          )}

          ${this.section(
            "Bilans od startu nauki",
            "Energia zliczona przez HomeOn od uruchomienia modelu.",
            this.grid([
              "learnEnergyLoad",
              "learnEnergyPv",
              "learnEnergyImport",
              "learnEnergyExport",
              "learnEnergyBatteryCharge",
              "learnEnergyBatteryDischarge",
              "learnEnergyInverterSelf",
              "learnAvgPv",
              "learnAvgImport",
              "learnAvgExport",
              "learnAvgBatteryCharge",
              "learnAvgBatteryDischarge"
            ])
          )}

          ${this.section(
            "Diagnostyka encji falownika",
            "Tutaj od razu widać, czym HomeOn próbuje sterować.",
            this.grid([
              "inverterConfigSource",
              "inverterDryRunSensor",
              "inverterEntityGridCharging",
              "inverterEntityExportSurplus",
              "inverterEntityExportPower",
              "inverterEntityChargeCurrent",
              "inverterEntityDischargeCurrent",
              "inverterBlockDischargeCurrent"
            ])
          )}

          <div class="footer">
            HomeOn Energy Card 0.2.24 · animowany przepływ energii · pełna diagnostyka EMS
          </div>
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get("homeon-energy-card")) {
  customElements.define("homeon-energy-card", HomeOnEnergyCard);
}

if (!customElements.get("homeon-energy-dashboard")) {
  customElements.define("homeon-energy-dashboard", HomeOnEnergyCard);
}

console.info("%c HomeOn Energy Card 0.2.24 loaded ", "background:#0b8f5a;color:white;border-radius:4px;padding:2px 6px;");
