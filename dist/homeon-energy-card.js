class HomeOnEnergyCard extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
    this.logo = this.config.logo || "/hacsfiles/homeon-energy-card/homeon_logo.svg";

    this.labels = {
      mode: "Tryb EMS",
      reason: "Decyzja EMS",
      soc: "SOC magazynu",
      batteryStatus: "Status baterii",
      batteryPower: "Moc baterii",
      pvPower: "Moc PV",
      loadPower: "Moc domu",
      gridPower: "Moc sieci",
      gridStatus: "Status sieci",
      inverterSelf: "Pobór własny falownika",
      buyPrice: "Cena zakupu",
      sellPrice: "Cena sprzedaży",
      bestSellPrice: "Najlepsza cena sprzedaży 24h",
      bestSellTime: "Godzina najlepszej sprzedaży",
      nextBetterSellPrice: "Następna lepsza cena sprzedaży",
      nextBetterSellTime: "Godzina następnej lepszej sprzedaży",
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
      sellDelta: "Różnica do najlepszej ceny",
      enabled: "Włączony",
      dryRun: "Tryb testowy dry-run",
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
      sellDelta: [
        "sensor.homeon_roznica_do_najlepszej_ceny",
        "sensor.homeon_energy_manager_roznica_do_najlepszej_ceny",
        "sensor.homeon_energy_manager_homeon_roznica_do_najlepszej_ceny"
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
      ]
    };

    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    return 8;
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

  modeClass(mode) {
    const m = String(mode || "");
    if (m.includes("WAIT")) return "wait";
    if (m.includes("SELL")) return "sell";
    if (m.includes("CHARGE") || m.includes("IMPORT")) return "charge";
    if (m.includes("EMERGENCY") || m.includes("FAILSAFE")) return "alarm";
    if (m.includes("EXPENSIVE")) return "expensive";
    return "normal";
  }

  render() {
    if (!this.shadowRoot || !this._hass) return;

    const mode = this.st("mode");
    const reason = this.st("reason");
    const modeClass = this.modeClass(mode);

    const soc = Math.max(0, Math.min(100, this.num("soc", 0)));
    const chargeTarget = Math.max(0, Math.min(100, this.num("chargeTarget", 0)));
    const dischargeTarget = Math.max(0, Math.min(100, this.num("dischargeTarget", 0)));
    const morningTarget = Math.max(0, Math.min(100, this.num("morningTarget", 0)));

    const pvPower = this.num("pvPower", 0);
    const gridPower = this.num("gridPower", 0);
    const batteryPower = this.num("batteryPower", 0);
    const inverterSelf = this.num("inverterSelf", 0);

    const batteryStatus = this.st("batteryStatus");
    const gridStatus = this.st("gridStatus");

    const pvActive = pvPower > 20 ? "active" : "idle";
    const gridActive = Math.abs(gridPower) > 20 ? "active" : "idle";
    const batteryActive = Math.abs(batteryPower) > 20 ? "active" : "idle";
    const inverterActive = inverterSelf > 10 ? "active" : "idle";

    const gridReverse = String(gridStatus).toLowerCase().includes("eksport") ? "reverse" : "";
    const batteryReverse = String(batteryStatus).toLowerCase().includes("roz") ? "reverse" : "";

    const importantKeys = ["mode", "reason", "soc", "batteryPower", "pvPower", "loadPower", "gridPower", "buyPrice", "sellPrice"];
    const missing = importantKeys.filter(k => !this.entity(k));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --bg: linear-gradient(135deg, #06101f, #0b172a 48%, #07120f);
          --card: rgba(255,255,255,0.075);
          --border: rgba(255,255,255,0.14);
          --text: #eef7ff;
          --muted: #91a8bf;
          --blue: #22a8ff;
          --green: #35e087;
          --yellow: #ffd166;
          --red: #ff4d6d;
          --purple: #b45cff;
        }

        ha-card {
          overflow: hidden;
          border-radius: 24px;
        }

        .wrap {
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(34,168,255,0.22), transparent 28%),
            radial-gradient(circle at top right, rgba(53,224,135,0.13), transparent 24%),
            var(--bg);
          padding: 18px;
          border: 1px solid var(--border);
          font-family: var(--ha-font-family, Arial, sans-serif);
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand img {
          width: 145px;
          max-width: 145px;
          height: auto;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.35));
        }

        .brand-title {
          font-size: 22px;
          font-weight: 900;
        }

        .brand-sub {
          color: var(--muted);
          font-size: 13px;
          margin-top: 3px;
        }

        .mode {
          min-width: 250px;
          text-align: right;
          padding: 13px 16px;
          border-radius: 18px;
          background: var(--card);
          border: 1px solid var(--border);
        }

        .mode-label {
          color: var(--muted);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.9px;
        }

        .mode-value {
          font-size: 20px;
          font-weight: 900;
          margin-top: 4px;
        }

        .mode.normal .mode-value { color: var(--blue); }
        .mode.sell .mode-value { color: var(--green); }
        .mode.charge .mode-value { color: var(--yellow); }
        .mode.alarm .mode-value { color: var(--red); }
        .mode.expensive .mode-value { color: var(--purple); }
        .mode.wait .mode-value { color: var(--yellow); }

        .reason, .missing {
          padding: 12px 14px;
          border-radius: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          margin-bottom: 14px;
          font-size: 14px;
        }

        .missing {
          border-color: rgba(255,77,109,0.55);
          color: #ffd6df;
        }

        .main {
          display: grid;
          grid-template-columns: 1.05fr 1.55fr 1.05fr;
          gap: 14px;
        }

        .panel {
          background: rgba(255,255,255,0.065);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 14px;
          min-width: 0;
        }

        .panel-title {
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.9px;
          font-size: 12px;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .soc {
          font-size: 48px;
          font-weight: 900;
          line-height: 1;
        }

        .bar {
          position: relative;
          height: 22px;
          background: rgba(255,255,255,0.13);
          border-radius: 999px;
          margin: 14px 0 12px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          width: ${soc}%;
          background: linear-gradient(90deg, var(--green), var(--blue));
        }

        .mark {
          position: absolute;
          top: -4px;
          width: 3px;
          height: 30px;
          border-radius: 999px;
          background: white;
        }

        .mark.charge { left: ${chargeTarget}%; background: var(--yellow); }
        .mark.discharge { left: ${dischargeTarget}%; background: var(--red); }
        .mark.morning { left: ${morningTarget}%; background: var(--purple); }

        .legend {
          display: grid;
          gap: 5px;
          color: var(--muted);
          font-size: 12px;
        }

        .dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 99px;
          margin-right: 6px;
        }

        .dot.charge { background: var(--yellow); }
        .dot.discharge { background: var(--red); }
        .dot.morning { background: var(--purple); }

        .tiles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          margin-top: 12px;
        }

        .tile {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 11px;
          min-width: 0;
        }

        .tile-title {
          color: var(--muted);
          font-size: 11px;
          margin-bottom: 5px;
        }

        .tile-value {
          font-size: 20px;
          font-weight: 850;
          overflow-wrap: anywhere;
        }

        .flow {
          position: relative;
          height: 480px;
        }

        .node {
          position: absolute;
          width: 132px;
          height: 132px;
          border-radius: 24px;
          background: rgba(255,255,255,0.11);
          border: 1px solid rgba(255,255,255,0.16);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .node.big {
          width: 154px;
          height: 154px;
        }

        .node-icon {
          font-size: 31px;
          line-height: 1;
          margin-bottom: 7px;
        }

        .node-name {
          color: var(--muted);
          font-size: 11px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .node-value {
          font-size: 22px;
          font-weight: 900;
          margin-top: 4px;
        }

        .node-sub {
          color: var(--muted);
          font-size: 11px;
          margin-top: 3px;
        }

        .pv { left: 50%; top: 4px; transform: translateX(-50%); }
        .home { left: 50%; top: 165px; transform: translateX(-50%); }
        .gridnode { left: 6px; top: 175px; }
        .batterynode { right: 6px; top: 175px; }
        .inverternode { left: 50%; bottom: 0; transform: translateX(-50%); width: 190px; height: 112px; }

        .line {
          position: absolute;
          border-radius: 999px;
          overflow: hidden;
          opacity: 0.95;
        }

        .line.idle {
          opacity: 0.13;
          filter: grayscale(1);
        }

        .line:after {
          content: "";
          position: absolute;
          background: white;
          opacity: 0.8;
          border-radius: 999px;
        }

        .line.idle:after {
          display: none;
        }

        .vline {
          width: 5px;
          left: calc(50% - 2px);
          background: linear-gradient(180deg, transparent, var(--yellow), transparent);
        }

        .vline:after {
          width: 5px;
          height: 26px;
          animation: flowY 1.15s linear infinite;
        }

        .hline {
          height: 5px;
          width: 112px;
          top: 240px;
          background: linear-gradient(90deg, transparent, var(--blue), transparent);
        }

        .hline:after {
          width: 32px;
          height: 5px;
          animation: flowX 1.15s linear infinite;
        }

        .pv-home { top: 118px; height: 75px; }
        .grid-home { left: 135px; }
        .home-battery { right: 135px; }
        .home-inverter {
          top: 322px;
          height: 60px;
          background: linear-gradient(180deg, transparent, var(--purple), transparent);
        }

        .reverse:after {
          animation-name: flowXRev;
        }

        @keyframes flowY {
          from { top: -28px; }
          to { top: 100%; }
        }

        @keyframes flowX {
          from { left: -35px; }
          to { left: 100%; }
        }

        @keyframes flowXRev {
          from { left: 100%; }
          to { left: -35px; }
        }

        .bottom {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        @media (max-width: 900px) {
          .top {
            flex-direction: column;
            align-items: stretch;
          }

          .mode {
            min-width: 0;
            text-align: left;
          }

          .main {
            grid-template-columns: 1fr;
          }

          .brand img {
            width: 120px;
            max-width: 120px;
          }

          .bottom {
            grid-template-columns: 1fr 1fr;
          }
        }
      </style>

      <ha-card>
        <div class="wrap">
          <div class="top">
            <div class="brand">
              <img src="${this.esc(this.logo)}" alt="HomeOn">
              <div>
                <div class="brand-title">HomeOn Energy Manager</div>
                <div class="brand-sub">PV · magazyn · ceny energii · decyzje EMS</div>
              </div>
            </div>

            <div class="mode ${modeClass}">
              <div class="mode-label">Aktualny tryb EMS</div>
              <div class="mode-value">${this.esc(mode)}</div>
              <div class="node-sub">enabled: ${this.esc(this.st("enabled"))} · dry-run: ${this.esc(this.st("dryRun"))}</div>
            </div>
          </div>

          ${missing.length ? `<div class="missing"><b>Brakuje encji:</b> ${missing.map(k => this.labels[k]).join(", ")}<br>To znaczy, że HA ma inne entity_id. Karta spróbuje dalej po nazwach, ale podeślij listę encji HomeOn, jeśli coś zostanie puste.</div>` : ""}

          <div class="reason">
            <b>Decyzja EMS:</b> ${this.esc(reason)}
          </div>

          <div class="main">
            <div class="panel">
              <div class="panel-title">Magazyn energii</div>
              <div class="soc">${soc.toFixed(0)}%</div>

              <div class="bar">
                <div class="bar-fill"></div>
                <div class="mark charge"></div>
                <div class="mark discharge"></div>
                <div class="mark morning"></div>
              </div>

              <div class="legend">
                <div><span class="dot charge"></span>Cel ładowania: <b>${this.fmt("chargeTarget")}</b></div>
                <div><span class="dot discharge"></span>Cel rozładowania: <b>${this.fmt("dischargeTarget")}</b></div>
                <div><span class="dot morning"></span>Cel poranny: <b>${this.fmt("morningTarget")}</b></div>
              </div>

              <div class="tiles">
                <div class="tile"><div class="tile-title">Moc baterii</div><div class="tile-value">${this.fmt("batteryPower")}</div></div>
                <div class="tile"><div class="tile-title">Status</div><div class="tile-value">${this.esc(batteryStatus)}</div></div>
                <div class="tile"><div class="tile-title">Do sprzedaży / użycia</div><div class="tile-value">${this.fmt("availableSell")}</div></div>
                <div class="tile"><div class="tile-title">Wolne miejsce</div><div class="tile-value">${this.fmt("freeSpace")}</div></div>
                <div class="tile"><div class="tile-title">Rezerwa nocna</div><div class="tile-value">${this.fmt("nightReserve")}</div></div>
                <div class="tile"><div class="tile-title">Doładować do celu</div><div class="tile-value">${this.fmt("chargeToTarget")}</div></div>
              </div>
            </div>

            <div class="panel flow">
              <div class="panel-title">Przepływ energii</div>

              <div class="node pv">
                <div class="node-icon">☀️</div>
                <div class="node-name">PV</div>
                <div class="node-value">${this.fmt("pvPower")}</div>
              </div>

              <div class="line vline pv-home ${pvActive}"></div>

              <div class="node gridnode">
                <div class="node-icon">🔌</div>
                <div class="node-name">Sieć</div>
                <div class="node-value">${this.fmt("gridPower")}</div>
                <div class="node-sub">${this.esc(gridStatus)}</div>
              </div>

              <div class="line hline grid-home ${gridActive} ${gridReverse}"></div>

              <div class="node big home">
                <div class="node-icon">🏠</div>
                <div class="node-name">Dom</div>
                <div class="node-value">${this.fmt("loadPower")}</div>
              </div>

              <div class="line hline home-battery ${batteryActive} ${batteryReverse}"></div>

              <div class="node batterynode">
                <div class="node-icon">🔋</div>
                <div class="node-name">Magazyn</div>
                <div class="node-value">${soc.toFixed(0)}%</div>
                <div class="node-sub">${this.fmt("batteryPower")}</div>
              </div>

              <div class="line vline home-inverter ${inverterActive}"></div>

              <div class="node inverternode">
                <div class="node-icon">⚙️</div>
                <div class="node-name">Falownik</div>
                <div class="node-value">${this.fmt("inverterSelf")}</div>
                <div class="node-sub">pobór własny / straty</div>
              </div>
            </div>

            <div class="panel">
              <div class="panel-title">Ceny i sprzedaż</div>

              <div class="tiles">
                <div class="tile"><div class="tile-title">Zakup teraz</div><div class="tile-value">${this.fmt("buyPrice", 2)}</div></div>
                <div class="tile"><div class="tile-title">Sprzedaż teraz</div><div class="tile-value">${this.fmt("sellPrice", 2)}</div></div>
                <div class="tile"><div class="tile-title">Najlepsza sprzedaż 24h</div><div class="tile-value">${this.fmt("bestSellPrice", 2)}</div></div>
                <div class="tile"><div class="tile-title">Godzina najlepszej ceny</div><div class="tile-value">${this.esc(this.st("bestSellTime"))}</div></div>
                <div class="tile"><div class="tile-title">Następna lepsza cena</div><div class="tile-value">${this.fmt("nextBetterSellPrice", 2)}</div></div>
                <div class="tile"><div class="tile-title">Godzina następnej lepszej</div><div class="tile-value">${this.esc(this.st("nextBetterSellTime"))}</div></div>
              </div>

              <div class="panel-title" style="margin-top:16px;">Prognoza PV</div>

              <div class="tiles">
                <div class="tile"><div class="tile-title">Pozostało dziś</div><div class="tile-value">${this.fmt("pvToday", 1)}</div></div>
                <div class="tile"><div class="tile-title">Jutro</div><div class="tile-value">${this.fmt("pvTomorrow", 1)}</div></div>
              </div>
            </div>
          </div>

          <div class="bottom">
            <div class="tile"><div class="tile-title">Cel ładowania</div><div class="tile-value">${this.fmt("chargeTarget")}</div></div>
            <div class="tile"><div class="tile-title">Cel rozładowania</div><div class="tile-value">${this.fmt("dischargeTarget")}</div></div>
            <div class="tile"><div class="tile-title">Nadwyżka ponad cel poranny</div><div class="tile-value">${this.fmt("aboveMorning")}</div></div>
            <div class="tile"><div class="tile-title">Różnica do najlepszej ceny</div><div class="tile-value">${this.fmt("sellDelta", 2)}</div></div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("homeon-energy-card", HomeOnEnergyCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "homeon-energy-card",
  name: "HomeOn Energy Card",
  description: "Panel HomeOn Energy Manager z automatycznym wykrywaniem encji."
});
