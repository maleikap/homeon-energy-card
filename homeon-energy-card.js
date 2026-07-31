class HomeOnEnergyCard extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
    this.title = this.config.title || "HomeOn Energy Dashboard";
    this.logo = this.config.logo || "/hacsfiles/homeon-energy-card/homeon_logo.svg?v=100";
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

      deyePlan: { label: "Deye plan komend", icon: "mdi:clipboard-list", find: ["deye plan komend"] },
      deyeCurrent: { label: "Deye aktualne stany", icon: "mdi:eye-check", find: ["deye aktualne stany"] },
      deyeChanges: { label: "Deye plan zmian", icon: "mdi:compare-horizontal", find: ["deye plan zmian"] },
      deyeChangedOnly: { label: "Deye tylko realne zmiany", icon: "mdi:playlist-check", find: ["deye tylko realne zmiany"] },
      deyeServices: { label: "Deye usługi HA", icon: "mdi:api", find: ["deye uslugi ha", "deye usługi ha"] },
      deyeCommandCount: { label: "Deye liczba komend", icon: "mdi:counter", find: ["deye liczba komend"] },
      deyeChangedCount: { label: "Deye liczba realnych zmian", icon: "mdi:counter", find: ["deye liczba realnych zmian"] },
      deyeUnchangedCount: { label: "Deye liczba bez zmian", icon: "mdi:counter", find: ["deye liczba bez zmian"] },
      deyeTestMode: { label: "Deye tryb testu", icon: "mdi:test-tube", find: ["deye tryb testu"] },

      pvRealityStatus: { label: "Realna pogoda PV", icon: "mdi:weather-sunny-alert", find: ["pv pogoda z produkcji"] },
      pvRealityScore: { label: "Jakość pogody z PV", icon: "mdi:percent", find: ["pv realna jakosc pogody"] },
      pvRealityExpected: { label: "PV oczekiwane przy pogodzie", icon: "mdi:solar-power", find: ["pv oczekiwana moc przy pogodzie"] },
      pvRealityLock: { label: "Blokada rozładowania", icon: "mdi:battery-lock", find: ["pv blokada rozladowania"] },
      pvRealityReason: { label: "Powód oceny PV", icon: "mdi:text-box-check", find: ["pv powod oceny pogody"] },
      pvRealityKwp: { label: "Moc instalacji PV", icon: "mdi:solar-power-variant", find: ["pv moc instalacji", "moc instalacji pv kwp"] },
      batteryTrade: { label: "Tryb handlu baterią", icon: "mdi:cash-sync", find: ["tryb handlu bateria"] },
      negativePriceStatus: { label: "Okno ceny ujemnej", icon: "mdi:cash-clock", find: ["okno ceny ujemnej"] },
      negativePriceStart: { label: "Start ceny ujemnej", icon: "mdi:clock-start", find: ["start ceny ujemnej"] },
      negativePriceEnd: { label: "Koniec ceny ujemnej", icon: "mdi:clock-end", find: ["koniec ceny ujemnej"] },
      negativePriceMin: { label: "Najniższa cena zakupu", icon: "mdi:cash-minus", find: ["najnizsza cena zakupu w oknie"] },
      negativePriceEnergyToFree: { label: "Energia do zwolnienia", icon: "mdi:battery-arrow-down", find: ["energia do zwolnienia przed cena ujemna"] },
      negativePriceRequiredFree: { label: "Wymagane wolne miejsce", icon: "mdi:battery-outline", find: ["wymagane wolne miejsce na cene ujemna"] },
      negativePriceTargetSoc: { label: "SOC przed oknem", icon: "mdi:battery-sync", find: ["docelowy soc przed cena ujemna"] },
      negativePriceExportW: { label: "Moc zwalniania magazynu", icon: "mdi:transmission-tower-export", find: ["zalecana moc zwalniania magazynu"] },
      negativePriceStrategy: { label: "Strategia ceny ujemnej", icon: "mdi:strategy", find: ["strategia ceny ujemnej"] },
      negativePriceReason: { label: "Powód strategii ceny ujemnej", icon: "mdi:text-box-check", find: ["powod strategii ceny ujemnej"] },
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

  entityCandidates() {
    return {
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

      batteryPower: [
        "sensor.homeon_moc_baterii",
        "sensor.homeon_energy_manager_moc_baterii",
        "sensor.homeon_energy_manager_homeon_moc_baterii"
      ],
      batteryStatus: [
        "sensor.homeon_status_baterii",
        "sensor.homeon_energy_manager_status_baterii",
        "sensor.homeon_energy_manager_homeon_status_baterii"
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

      inverterSelf: [
        "sensor.homeon_pobor_wlasny_falownika",
        "sensor.homeon_energy_manager_pobor_wlasny_falownika",
        "sensor.homeon_energy_manager_homeon_pobor_wlasny_falownika"
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
      morningTarget: [
        "sensor.homeon_cel_poranny",
        "sensor.homeon_energy_manager_cel_poranny",
        "sensor.homeon_energy_manager_homeon_cel_poranny"
      ],
      nightReserve: [
        "sensor.homeon_rezerwa_nocna",
        "sensor.homeon_energy_manager_rezerwa_nocna",
        "sensor.homeon_energy_manager_homeon_rezerwa_nocna"
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
      ]
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

    const exactCandidates = (this.entityCandidates()[key] || []).concat(def.candidates || []);
    for (const entityId of exactCandidates) {
      if (hass.states[entityId]) return entityId;
    }

    const findList = def.find || [];
    const domain = def.domain || null;

    for (const pattern of findList) {
      const tokens = this.norm(pattern).split(" ").filter(Boolean);

      for (const [entityId, stateObj] of Object.entries(hass.states)) {
        if (domain && !entityId.startsWith(domain + ".")) continue;

        const friendly = this.norm(stateObj.attributes && stateObj.attributes.friendly_name);
        const entityNorm = this.norm(entityId);

        const isHomeOn = entityNorm.includes("homeon") || friendly.includes("homeon");
        if (!isHomeOn) continue;

        const friendlyOk = tokens.every((t) => friendly.includes(t));
        const entityOk = tokens.every((t) => entityNorm.includes(t));

        if (friendlyOk || entityOk) return entityId;
      }
    }

    for (const pattern of findList) {
      const tokens = this.norm(pattern).split(" ").filter(Boolean);

      for (const [entityId, stateObj] of Object.entries(hass.states)) {
        if (domain && !entityId.startsWith(domain + ".")) continue;

        const friendly = this.norm(stateObj.attributes && stateObj.attributes.friendly_name);
        const entityNorm = this.norm(entityId);

        const friendlyOk = tokens.every((t) => friendly.includes(t));
        const entityOk = tokens.every((t) => entityNorm.includes(t));

        if (friendlyOk || entityOk) return entityId;
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


  hasUsefulValue(key) {
    const obj = this.stateObj(key);
    if (!obj) return false;

    const state = String(obj.state ?? "").trim().toLowerCase();

    if (
      state === "" ||
      state === "unknown" ||
      state === "unavailable" ||
      state === "none" ||
      state === "null"
    ) {
      return false;
    }

    return true;
  }

  tile(key, opts = {}) {
    if (!this.hasUsefulValue(key)) return "";

    const def = this.defs()[key] || {};
    const label = opts.label || def.label || key;
    const icon = opts.icon || def.icon || "mdi:information-outline";
    const value = this.value(key, "");
    const tileClass = "tile tile-" + this.norm(key).replaceAll(" ", "-").replace(/[^a-z0-9_-]/g, "");

    return `
      <div class="${tileClass}" title="${this.esc(label)}: ${this.esc(value)}">
        <ha-icon icon="${this.esc(icon)}"></ha-icon>
        <div>
          <span title="${this.esc(label)}">${this.esc(label)}</span>
          <b title="${this.esc(value)}">${this.esc(value)}</b>
        </div>
      </div>
    `;
  }

  sectionClass(title) {
    const t = this.norm(title);
    if (t.includes("ujemn") || t.includes("arbitraz")) return "negative-section market-section";
    if (t.includes("rynek") || t.includes("energia")) return "market-section";
    if (t.includes("uczenie")) return "learning-section";
    if (t.includes("bilans")) return "balance-section";
    if (t.includes("plan")) return "plan-section";
    if (t.includes("falownik")) return "inverter-section";
    return "";
  }

  section(title, subtitle, content) {
    const body = String(content || "").trim();
    if (!body) return "";

    const cls = this.sectionClass(title);

    return `
      <section class="section-card ${this.esc(cls)}">
        <div class="section-head">
          <div>
            <h3>${this.esc(title)}</h3>
            ${subtitle ? `<p>${this.esc(subtitle)}</p>` : ""}
          </div>
        </div>
        ${body}
      </section>
    `;
  }

  grid(keys) {
    const seenEntityIds = new Set();

    const html = (keys || [])
      .filter((key) => {
        const entityId = this.findEntity(key);
        if (!entityId || seenEntityIds.has(entityId)) return false;
        seenEntityIds.add(entityId);
        return true;
      })
      .map((key) => this.tile(key))
      .filter((item) => String(item || "").trim())
      .join("");

    if (!html) return "";

    return `<div class="grid">${html}</div>`;
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

    const gridMode = gridImport > gridExport ? "IMPORT" : gridExport > 25 ? "EKSPORT" : "ZERO";
    const batteryMode = batteryDischarge > batteryCharge ? "ROZŁADOWANIE" : batteryCharge > 25 ? "ŁADOWANIE" : "POSTÓJ";

    const pvOn = pv > 25 ? " on" : "";
    const gridOn = gridFlow > 25 ? " on" : "";
    const batteryOn = batteryFlow > 25 ? " on" : "";

    const gridReverse = gridExport > gridImport ? " reverse" : "";
    const batteryReverse = batteryDischarge > batteryCharge ? " reverse" : "";

    return `
      <section class="hf-card">
        <div class="hf-head">
          <div>
            <h3>Przepływ energii</h3>
            <p>PV → Dom. Sieć po lewej, bateria po prawej. Animacja pokazuje kierunek przepływu.</p>
          </div>
          <div class="hf-mode">${this.esc(this.value("mode"))}</div>
        </div>

        <div class="hf-board">
          <div class="hf-top">
            <div class="hf-node hf-pv-node">
              <div class="hf-orb hf-solar"><ha-icon icon="mdi:solar-power"></ha-icon></div>
              <strong>PV</strong>
              <b>${this.fmtW(pv)}</b>
            </div>
          </div>

          <div class="hf-vertical hf-pv-flow${pvOn}">
            <div class="hf-lane hf-lane-v">
              <i></i><i></i><i></i>
              <em>${this.fmtW(pv)}</em>
            </div>
          </div>

          <div class="hf-mid">
            <div class="hf-node">
              <div class="hf-orb hf-grid-orb"><ha-icon icon="mdi:transmission-tower"></ha-icon></div>
              <strong>Sieć</strong>
              <b>${this.fmtW(gridFlow)}</b>
              <small>${this.esc(gridMode)}</small>
            </div>

            <div class="hf-lane hf-lane-h hf-grid-flow${gridOn}${gridReverse}">
              <i></i><i></i><i></i>
              <em>${this.fmtW(gridFlow)}</em>
            </div>

            <div class="hf-node hf-home-node">
              <div class="hf-orb hf-home-orb"><ha-icon icon="mdi:home-lightning-bolt"></ha-icon></div>
              <strong>Dom</strong>
              <b>${this.fmtW(load)}</b>
              <small>zużycie teraz</small>
            </div>

            <div class="hf-lane hf-lane-h hf-battery-flow${batteryOn}${batteryReverse}">
              <i></i><i></i><i></i>
              <em>${this.fmtW(batteryFlow)}</em>
            </div>

            <div class="hf-node">
              <div class="hf-orb hf-batt-orb"><ha-icon icon="mdi:battery"></ha-icon></div>
              <strong>Bateria</strong>
              <b>${this.esc(this.value("soc"))}</b>
              <small>${this.esc(batteryMode)}</small>
            </div>
          </div>

          <div class="hf-inverter">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span>Falownik</span>
            <b>${this.fmtW(inverterSelf)}</b>
          </div>
        </div>

        <div class="hf-summary">
          <div><ha-icon icon="mdi:solar-power"></ha-icon><span>PV</span><b>${this.fmtW(pv)}</b></div>
          <div><ha-icon icon="mdi:home-lightning-bolt"></ha-icon><span>Dom</span><b>${this.fmtW(load)}</b></div>
          <div><ha-icon icon="mdi:battery-plus"></ha-icon><span>Cel ładowania</span><b>${this.esc(this.value("chargeTarget"))}</b></div>
          <div><ha-icon icon="mdi:cash-check"></ha-icon><span>Do sprzedaży</span><b>${this.esc(this.value("availableSell"))}</b></div>
        </div>
      </section>
    `;
  }




  negativePriceCard() {
    if (
      !this.hasUsefulValue("negativePriceStatus") &&
      !this.hasUsefulValue("negativePriceStrategy")
    ) {
      return "";
    }

    const reason = this.value("negativePriceReason");
    const strategy = this.value("negativePriceStrategy");

    return this.section(
      "Plan cen ujemnych",
      "HomeOn robi miejsce w magazynie przed ceną ujemną, ładuje w czasie ceny ujemnej i pozwala sprzedać później przy lepszej cenie.",
      this.grid([
        "negativePriceStatus",
        "negativePriceStart",
        "negativePriceEnd",
        "negativePriceMin",
        "negativePriceEnergyToFree",
        "negativePriceRequiredFree",
        "negativePriceTargetSoc",
        "negativePriceExportW",
        "batteryTrade",
        "pvRealityStatus",
        "pvRealityScore",
        "sellPrice"
      ]) + `<div class="long-text">${this.esc(strategy)}</div><div class="long-text">${this.esc(reason)}</div>`
    );
  }

  pvRealityCard() {
    if (
      !this.hasUsefulValue("pvRealityStatus") &&
      !this.hasUsefulValue("pvRealityScore") &&
      !this.hasUsefulValue("pvRealityExpected")
    ) {
      return "";
    }

    const score = Math.max(0, Math.min(100, this.num("pvRealityScore", 0)));
    const status = this.plain("pvRealityStatus", "—");
    const lockRaw = this.norm(this.plain("pvRealityLock", "off"));
    const locked = lockRaw.includes("on") || lockRaw.includes("true") || lockRaw.includes("tak");

    let quality = "neutral";
    if (locked || score < 35) quality = "bad";
    else if (score < 50) quality = "weak";
    else if (score < 75) quality = "ok";
    else quality = "good";

    const ringStyle = `--pv-score:${score};`;

    return `
      <section class="pv-reality-card pv-reality-${quality}">
        <div class="pv-reality-head">
          <div>
            <h3>PV — realna pogoda z produkcji</h3>
            <p>HomeOn porównuje aktualną produkcję z mocą instalacji, godziną i porą roku. To zabezpiecza magazyn, gdy prognoza pogody się myli.</p>
          </div>
          <div class="pv-reality-status">
            <span>${this.esc(status)}</span>
            <b>${locked ? "Ochrona magazynu aktywna" : "Praca normalna"}</b>
          </div>
        </div>

        <div class="pv-reality-main">
          <div class="pv-reality-score">
            <div class="pv-score-ring" style="${ringStyle}">
              <div>
                <strong>${Math.round(score)}%</strong>
                <span>jakość PV</span>
              </div>
            </div>
          </div>

          <div class="pv-reality-data">
            <div class="pv-reality-grid">
              ${this.tile("pvRealityKwp")}
              ${this.tile("pvPower")}
              ${this.tile("pvRealityExpected")}
              ${this.tile("pvRealityLock")}
              ${this.tile("pvTomorrow")}
              ${this.tile("chargeTarget")}
            </div>

            <div class="pv-reality-progress">
              <div>
                <span style="width:${score}%"></span>
              </div>
              <p>Im wyższy wynik, tym bardziej aktualna produkcja PV potwierdza dobrą pogodę. Przy niskim wyniku HomeOn ostrożniej rozładowuje baterię.</p>
            </div>
          </div>
        </div>

        <div class="pv-reality-reason">
          <ha-icon icon="mdi:text-box-check"></ha-icon>
          <span>${this.esc(this.value("pvRealityReason"))}</span>
        </div>
      </section>
    `;
  }

  deyeInspector() {
    const testMode = this.value("deyeTestMode");
    const changedOnly = this.value("deyeChangedOnly");
    const changes = this.value("deyeChanges");
    const current = this.value("deyeCurrent");
    const services = this.value("deyeServices");
    const plan = this.value("deyePlan");

    return `
      <section class="deye-card">
        <div class="deye-head">
          <div>
            <h3>Deye — co HomeOn chce zmienić</h3>
            <p>Podgląd komend przed zapisem do falownika. Przy dry-run nic nie jest wysyłane do Deye.</p>
          </div>
          <div class="deye-pill">${this.esc(testMode)}</div>
        </div>

        <div class="deye-top-grid">
          ${this.tile("deyeTestMode")}
          ${this.tile("deyeCommandCount")}
          ${this.tile("deyeChangedCount")}
          ${this.tile("deyeUnchangedCount")}
        </div>

        <div class="deye-change-main">
          <div class="deye-panel deye-important">
            <div class="deye-panel-title">
              <ha-icon icon="mdi:playlist-check"></ha-icon>
              <span>Tylko realne zmiany</span>
            </div>
            <div class="deye-panel-text">${this.esc(changedOnly)}</div>
          </div>

          <div class="deye-panel">
            <div class="deye-panel-title">
              <ha-icon icon="mdi:compare-horizontal"></ha-icon>
              <span>Aktualnie w Deye → nowa wartość HomeOn</span>
            </div>
            <div class="deye-panel-text">${this.esc(changes)}</div>
          </div>

          <div class="deye-panel">
            <div class="deye-panel-title">
              <ha-icon icon="mdi:eye-check"></ha-icon>
              <span>Aktualne stany encji Deye</span>
            </div>
            <div class="deye-panel-text">${this.esc(current)}</div>
          </div>

          <div class="deye-panel">
            <div class="deye-panel-title">
              <ha-icon icon="mdi:clipboard-list"></ha-icon>
              <span>Plan komend</span>
            </div>
            <div class="deye-panel-text">${this.esc(plan)}</div>
          </div>

          <div class="deye-panel">
            <div class="deye-panel-title">
              <ha-icon icon="mdi:api"></ha-icon>
              <span>Usługi Home Assistant, które zostaną wykonane</span>
            </div>
            <div class="deye-panel-text">${this.esc(services)}</div>
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
            <img src="${this.esc(this.logo)}" alt="HomeOn">
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

  directState(entityId) {
    return this._hass?.states?.[entityId] || null;
  }

  directNumber(entityId, fallback = 0) {
    const state = this.directState(entityId);
    if (!state) return fallback;
    const value = Number.parseFloat(String(state.state ?? "").replace(",", "."));
    return Number.isFinite(value) ? value : fallback;
  }

  money(value, unit = "zł") {
    const number = Number.isFinite(value) ? value : 0;
    return `${number.toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} ${unit || "zł"}`;
  }

  clientHero() {
    const cls = this.statusClass();
    return `
      <header class="client-hero ${cls}">
        <img src="${this.esc(this.logo)}" alt="HomeOn">
        <div class="client-hero-copy">
          <div class="client-title">${this.esc(this.title)}</div>
          <div class="client-mode">${this.esc(this.value("mode"))}</div>
          <div class="client-reason">${this.esc(this.value("reason"))}</div>
        </div>
      </header>
    `;
  }

  clientFlowCard() {
    const pv = Math.max(0, this.num("pvPower", 0));
    const load = Math.max(0, this.num("loadPower", 0));
    const charge = Math.max(0, this.num("batteryCharge", 0));
    const discharge = Math.max(0, this.num("batteryDischarge", 0));
    const gridImport = Math.max(0, this.num("gridImport", 0));
    const gridExport = Math.max(0, this.num("gridExport", 0));
    const battery = Math.max(charge, discharge);
    const grid = Math.max(gridImport, gridExport);

    const batteryText = discharge > charge ? "rozładowanie" : charge > 25 ? "ładowanie" : "postój";
    const gridText = gridImport > gridExport ? "pobór" : gridExport > 25 ? "sprzedaż" : "bez wymiany";

    const node = (icon, label, value, subtitle, color, active) => `
      <div class="flow-item ${active ? "active" : ""}" style="--node-color:${color}">
        <ha-icon icon="${icon}"></ha-icon>
        <span>${label}</span>
        <strong>${value}</strong>
        <small>${subtitle}</small>
      </div>
    `;

    return `
      <section class="client-panel">
        <div class="client-head">
          <div><h3>Energia teraz</h3><p>Najważniejsze przepływy instalacji.</p></div>
          <span class="live-pill"><i></i> na żywo</span>
        </div>
        <div class="client-flow">
          ${node("mdi:solar-power", "Produkcja PV", this.fmtW(pv), "panele", "#f59e0b", pv > 25)}
          ${node("mdi:home-lightning-bolt", "Zużycie domu", this.fmtW(load), "aktualnie", "#22c55e", load > 25)}
          ${node("mdi:battery", "Magazyn", this.esc(this.value("soc")), batteryText + " · " + this.fmtW(battery), "#38bdf8", battery > 25)}
          ${node("mdi:transmission-tower", "Sieć", this.fmtW(grid), gridText, "#a78bfa", grid > 25)}
        </div>
      </section>
    `;
  }

  financeCard() {
    const saleEntity = this.config.sale_value_entity || "sensor.pstryk_aio_dzienna_wartosc_produkcji_energii";
    const costEntity = this.config.purchase_cost_entity || "sensor.pstryk_aio_dzienne_koszty_zuzycia_energii";
    const saleState = this.directState(saleEntity);
    const costState = this.directState(costEntity);

    if (!saleState && !costState) return "";

    const sale = Math.max(0, this.directNumber(saleEntity, 0));
    const cost = Math.max(0, this.directNumber(costEntity, 0));
    const balance = sale - cost;
    const scale = Math.max(sale, cost, 0.01);
    const saleWidth = Math.max(2, Math.min(100, sale / scale * 100));
    const costWidth = Math.max(2, Math.min(100, cost / scale * 100));
    const unit = saleState?.attributes?.unit_of_measurement
      || costState?.attributes?.unit_of_measurement
      || "zł";

    return `
      <section class="client-panel finance-panel">
        <div class="client-head">
          <div><h3>Bilans finansowy dzisiaj</h3><p>Wartość sprzedanej energii i koszt energii kupionej.</p></div>
          <div class="balance ${balance >= 0 ? "positive" : "negative"}">
            <span>Bilans</span><strong>${balance >= 0 ? "+" : ""}${this.money(balance, unit)}</strong>
          </div>
        </div>
        <div class="money-chart">
          <div class="money-row sale">
            <div class="money-label"><span>Sprzedaż energii</span><strong>${this.money(sale, unit)}</strong></div>
            <div class="money-track"><i style="width:${saleWidth}%"></i></div>
          </div>
          <div class="money-row cost">
            <div class="money-label"><span>Zakup energii</span><strong>${this.money(cost, unit)}</strong></div>
            <div class="money-track"><i style="width:${costWidth}%"></i></div>
          </div>
        </div>
      </section>
    `;
  }

  clientBatteryCard() {
    const soc = Math.max(0, Math.min(100, this.num("soc", 0)));
    return `
      <section class="client-panel battery-panel">
        <div class="client-head">
          <div><h3>Magazyn energii</h3><p>Aktualny poziom i cele wyznaczone przez HomeOn.</p></div>
          <strong class="soc-big">${soc.toFixed(1)}%</strong>
        </div>
        <div class="soc-track"><i style="width:${soc}%"></i></div>
        <div class="compact-grid">
          ${this.tile("batteryStatus")}
          ${this.tile("chargeTarget")}
          ${this.tile("dischargeTarget")}
          ${this.tile("freeSpace")}
        </div>
      </section>
    `;
  }

  render() {
    if (!this._hass) return;

    const nextReason = this.value("planNextActionReason");

    this.innerHTML = `
      <ha-card>
        <style>
          :host {
            --homeon-border: color-mix(in srgb, var(--divider-color, #94a3b8) 65%, transparent);
            --homeon-muted: var(--secondary-text-color);
            --homeon-text: var(--primary-text-color);
            --homeon-surface: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--primary-color) 6%);
          }
          * { box-sizing: border-box; }
          ha-card { overflow: hidden; border-radius: 22px; }
          .client-wrap { display: grid; gap: 14px; padding: 16px; color: var(--homeon-text); }
          .client-hero {
            display: flex; align-items: center; gap: 18px; padding: 20px;
            border: 1px solid var(--homeon-border); border-radius: 22px;
            background: linear-gradient(135deg, rgba(56,189,248,.15), rgba(34,197,94,.09));
          }
          .client-hero.sell { background: linear-gradient(135deg, rgba(34,197,94,.20), rgba(56,189,248,.10)); }
          .client-hero.charge { background: linear-gradient(135deg, rgba(56,189,248,.20), rgba(34,197,94,.08)); }
          .client-hero.danger { background: linear-gradient(135deg, rgba(239,68,68,.20), rgba(249,115,22,.10)); }
          .client-hero img { width: 92px; height: 92px; object-fit: contain; flex: 0 0 auto; }
          .client-hero-copy { min-width: 0; }
          .client-title { color: var(--homeon-muted); font-size: 13px; font-weight: 750; margin-bottom: 5px; }
          .client-mode { font-size: clamp(23px, 4vw, 34px); line-height: 1.1; font-weight: 950; letter-spacing: -.035em; overflow-wrap: anywhere; }
          .client-reason { margin-top: 9px; color: var(--homeon-muted); font-size: 13px; line-height: 1.45; }
          .client-panel {
            padding: 17px; border: 1px solid var(--homeon-border); border-radius: 20px;
            background: var(--homeon-surface);
          }
          .client-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 15px; }
          .client-head h3 { margin: 0; font-size: 18px; font-weight: 900; letter-spacing: -.02em; }
          .client-head p { margin: 4px 0 0; color: var(--homeon-muted); font-size: 12px; line-height: 1.35; }
          .live-pill {
            display: inline-flex; align-items: center; gap: 7px; padding: 6px 9px; border-radius: 999px;
            background: rgba(34,197,94,.12); color: #16a34a; font-size: 11px; font-weight: 850; white-space: nowrap;
          }
          .live-pill i { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34,197,94,.13); }
          .client-flow { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 10px; }
          .flow-item {
            min-width: 0; padding: 14px 12px; border: 1px solid var(--homeon-border); border-radius: 17px;
            display: flex; flex-direction: column; gap: 4px; background: var(--card-background-color, #fff);
          }
          .flow-item ha-icon { color: var(--node-color); width: 28px; height: 28px; margin-bottom: 4px; }
          .flow-item.active { border-color: color-mix(in srgb, var(--node-color) 55%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--node-color) 16%, transparent); }
          .flow-item span { color: var(--homeon-muted); font-size: 11px; font-weight: 750; }
          .flow-item strong { font-size: 18px; font-weight: 950; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .flow-item small { color: var(--homeon-muted); font-size: 10.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .balance { text-align: right; }
          .balance span { display: block; color: var(--homeon-muted); font-size: 11px; }
          .balance strong { font-size: 21px; font-weight: 950; white-space: nowrap; }
          .balance.positive strong { color: #16a34a; }
          .balance.negative strong { color: #dc2626; }
          .money-chart { display: grid; gap: 14px; }
          .money-label { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; margin-bottom: 6px; }
          .money-label strong { white-space: nowrap; }
          .money-track, .soc-track { height: 13px; border-radius: 999px; overflow: hidden; background: rgba(148,163,184,.20); }
          .money-track i, .soc-track i { display: block; height: 100%; border-radius: inherit; }
          .money-row.sale .money-track i { background: linear-gradient(90deg, #16a34a, #4ade80); }
          .money-row.cost .money-track i { background: linear-gradient(90deg, #ef4444, #fb923c); }
          .soc-big { font-size: 25px; font-weight: 950; color: #38bdf8; }
          .soc-track { height: 16px; margin-bottom: 13px; }
          .soc-track i { background: linear-gradient(90deg, #38bdf8, #22c55e); }
          .compact-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 9px; }
          .tile {
            min-width: 0; min-height: 65px; display: flex; align-items: center; gap: 9px;
            padding: 10px; border: 1px solid var(--homeon-border); border-radius: 15px;
            background: var(--card-background-color, #fff);
          }
          .tile ha-icon { flex: 0 0 auto; width: 22px; height: 22px; color: var(--primary-color); }
          .tile div { min-width: 0; }
          .tile span { display: block; color: var(--homeon-muted); font-size: 10.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .tile b { display: block; margin-top: 3px; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .client-split { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .client-note { margin-top: 11px; padding: 11px 12px; border-radius: 14px; background: rgba(56,189,248,.09); color: var(--homeon-muted); font-size: 12px; line-height: 1.4; }
          .client-footer { padding: 2px 4px 0; color: var(--homeon-muted); text-align: center; font-size: 10.5px; }
          @media (max-width: 820px) {
            .client-flow, .compact-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
            .client-split { grid-template-columns: 1fr; }
          }
          @media (max-width: 520px) {
            .client-wrap { padding: 10px; gap: 10px; }
            .client-hero { padding: 15px; align-items: flex-start; }
            .client-hero img { width: 64px; height: 64px; }
            .client-mode { font-size: 22px; }
            .client-panel { padding: 14px; }
            .client-flow { grid-template-columns: repeat(2, minmax(0,1fr)); }
            .compact-grid { grid-template-columns: 1fr 1fr; }
          }
        </style>

        <div class="client-wrap">
          ${this.clientHero()}
          ${this.clientFlowCard()}
          ${this.financeCard()}
          ${this.clientBatteryCard()}

          <div class="client-split">
            <section class="client-panel">
              <div class="client-head"><div><h3>Ceny i prognoza</h3><p>Dane potrzebne do codziennych decyzji.</p></div></div>
              <div class="compact-grid">
                ${this.tile("buyPrice")}
                ${this.tile("sellPrice")}
                ${this.tile("pvToday")}
                ${this.tile("pvTomorrow")}
              </div>
            </section>

            <section class="client-panel">
              <div class="client-head"><div><h3>Co zrobi HomeOn?</h3><p>Najbliższa zaplanowana akcja.</p></div></div>
              <div class="compact-grid">
                ${this.tile("planNextAction")}
                ${this.tile("planNextActionTime")}
                ${this.tile("planRecommendedSoc")}
                ${this.tile("planSellWindow")}
              </div>
              ${nextReason && nextReason !== "—" ? `<div class="client-note">${this.esc(nextReason)}</div>` : ""}
            </section>
          </div>

          <div class="client-footer">HomeOn Energy Card 1.0.0 · widok klienta</div>
        </div>
      </ha-card>
    `;
  }

}

if (!customElements.get("homeon-energy-card")) {
  customElements.define("homeon-energy-card", HomeOnEnergyCard);
}

console.info("%c HomeOn Energy Card 1.0.0 loaded ", "background:#0b8f5a;color:white;border-radius:4px;padding:2px 6px;");
