class HomeOnEnergyCardV044 extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
    this.title = this.config.title || "HomeOn Energy Dashboard";
    this.logo = this.config.logo || "/local/community/homeon-energy-card/homeon_logo.svg?v=025";
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
      dataQualityStatus: { label: "Status danych", icon: "mdi:database-check", find: ["status danych"] },
      dataQualityScore: { label: "Wynik jakości danych", icon: "mdi:gauge", find: ["wynik jakosci danych"] },
      dataQualityErrors: { label: "Błędy danych", icon: "mdi:database-alert", find: ["bledy danych"] },
      dataQualityWarnings: { label: "Ostrzeżenia danych", icon: "mdi:database-eye", find: ["ostrzezenia danych"] },
      dataQualityLastOk: { label: "Ostatni poprawny odczyt", icon: "mdi:clock-check", find: ["ostatni poprawny odczyt"] },
      safeMode: { label: "SAFE MODE", icon: "mdi:shield-alert", find: ["safe mode"] },
      safeModeReason: { label: "Powód SAFE MODE", icon: "mdi:text-box-alert", find: ["powod safe mode"] },
      safeModeAction: { label: "Akcja SAFE MODE", icon: "mdi:shield-check", find: ["akcja safe mode"] },

      economicProfit: { label: "Szacowany zysk sprzedaży", icon: "mdi:cash-check", find: ["szacowany zysk sprzedazy"] },
      economicSellReady: { label: "Gotowość sprzedaży ekonomicznej", icon: "mdi:battery-arrow-up", find: ["gotowosc sprzedazy ekonomicznej"] },
      economicSellReason: { label: "Powód ekonomii sprzedaży", icon: "mdi:text-box-check", find: ["powod ekonomii sprzedazy"] },
      economicCycleCost: { label: "Koszt cyklu baterii", icon: "mdi:battery-sync", find: ["koszt cyklu baterii"] },

      modeCandidate: { label: "Kandydat trybu EMS", icon: "mdi:swap-horizontal", find: ["kandydat trybu ems"] },
      modeHysteresis: { label: "Histereza trybu EMS", icon: "mdi:timer-sync", find: ["histereza trybu ems"] },
      modeHysteresisReason: { label: "Powód histerezy trybu", icon: "mdi:text-box-clock", find: ["powod histerezy trybu"] },
      modeHoldRemaining: { label: "Pozostały czas trybu EMS", icon: "mdi:timer-sand", find: ["pozostaly czas trybu ems"] },
      modeMinHold: { label: "Minimalny czas trybu EMS", icon: "mdi:timer-lock", find: ["minimalny czas trybu ems"] },

      deyeDriverSafety: { label: "Deye driver status bezpieczeństwa", icon: "mdi:shield-check", find: ["deye driver status bezpieczenstwa"] },
      deyeDriverBlock: { label: "Deye driver powód blokady", icon: "mdi:shield-alert", find: ["deye driver powod blokady"] },
      deyeDriverMinInterval: { label: "Deye minimalny odstęp komend", icon: "mdi:timer-cog", find: ["deye minimalny odstep komend"] },
      deyeDriverMaxChanges: { label: "Deye maksymalna liczba zmian", icon: "mdi:shield-counter", find: ["deye maksymalna liczba zmian"] },
      deyeDriverChangedRuntime: { label: "Deye liczba zmian w cyklu", icon: "mdi:counter", find: ["deye liczba zmian w cyklu"] },
      deyeDriverHash: { label: "Deye ostatni plan komend", icon: "mdi:fingerprint", find: ["deye ostatni plan komend"] },

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
    const html = (keys || [])
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
            <img src="${this.esc(this.logo)}" onerror="this.onerror=null;this.src='/hacsfiles/homeon-energy-card/homeon_logo.svg?v=025'">
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


          .brand img {
            width: 170px !important;
            height: 92px !important;
            min-width: 170px !important;
            min-height: 92px !important;
            border-radius: 20px !important;
            object-fit: contain !important;
            background: transparent !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .brand-title {
            font-size: 34px !important;
            font-weight: 900 !important;
            letter-spacing: -.04em !important;
          }

          .hf-card {
            border: 1px solid var(--homeon-border);
            border-radius: 24px;
            padding: 18px;
            background:
              radial-gradient(circle at 50% 18%, rgba(250,204,21,.10), transparent 24%),
              radial-gradient(circle at 18% 62%, rgba(167,139,250,.09), transparent 22%),
              radial-gradient(circle at 82% 62%, rgba(34,197,94,.09), transparent 22%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015));
          }

          .hf-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
            margin-bottom: 14px;
          }

          .hf-head h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: -.02em;
          }

          .hf-head p {
            margin: 4px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
            line-height: 1.35;
          }

          .hf-mode {
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 7px 12px;
            background: var(--homeon-bg);
            font-size: 12px;
            font-weight: 850;
            white-space: nowrap;
          }

          .hf-board {
            border: 1px solid var(--homeon-border);
            border-radius: 26px;
            background:
              radial-gradient(circle at 50% 48%, rgba(56,189,248,.10), transparent 20%),
              radial-gradient(circle at 50% 48%, rgba(34,197,94,.06), transparent 36%),
              var(--homeon-bg);
            padding: 18px;
            overflow: hidden;
          }

          .hf-top {
            display: flex;
            justify-content: center;
          }

          .hf-mid {
            display: grid;
            grid-template-columns: 160px minmax(120px, 1fr) 178px minmax(120px, 1fr) 160px;
            gap: 12px;
            align-items: center;
          }

          .hf-node {
            min-height: 124px;
            border-radius: 22px;
            border: 1px solid var(--homeon-border);
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent);
            box-shadow: 0 16px 38px rgba(0,0,0,.07);
            backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 5px;
            padding: 12px;
            box-sizing: border-box;
          }

          .hf-home-node {
            min-height: 138px;
            box-shadow: 0 20px 48px rgba(56,189,248,.13);
          }

          .hf-node strong {
            font-size: 14px;
            font-weight: 900;
          }

          .hf-node b {
            font-size: 18px;
            font-weight: 900;
          }

          .hf-home-node b {
            font-size: 20px;
          }

          .hf-node small {
            color: var(--homeon-muted);
            font-size: 11px;
          }

          .hf-orb {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            color: white;
            box-shadow: 0 0 28px rgba(0,0,0,.14);
          }

          .hf-orb ha-icon {
            width: 29px;
            height: 29px;
          }

          .hf-solar { background: linear-gradient(135deg, #facc15, #f97316); }
          .hf-home-orb { background: linear-gradient(135deg, #38bdf8, #2563eb); }
          .hf-grid-orb { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
          .hf-batt-orb { background: linear-gradient(135deg, #22c55e, #0f766e); }

          .hf-vertical {
            display: flex;
            justify-content: center;
            height: 52px;
            align-items: center;
          }

          .hf-lane {
            position: relative;
            border-radius: 999px;
            opacity: .26;
          }

          .hf-lane.on,
          .hf-pv-flow.on .hf-lane {
            opacity: 1;
          }

          .hf-lane-v {
            width: 9px;
            height: 48px;
            background: linear-gradient(180deg, rgba(250,204,21,.18), rgba(250,204,21,.70));
          }

          .hf-lane-h {
            height: 9px;
            min-width: 110px;
          }

          .hf-grid-flow {
            background: linear-gradient(90deg, rgba(167,139,250,.72), rgba(167,139,250,.18));
          }

          .hf-battery-flow {
            background: linear-gradient(90deg, rgba(34,197,94,.18), rgba(34,197,94,.72));
          }

          .hf-lane i {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            opacity: 0;
          }

          .hf-lane:not(.on) i,
          .hf-pv-flow:not(.on) .hf-lane i {
            display: none;
          }

          .hf-lane-v i {
            left: -1.5px;
            background: #facc15;
            box-shadow: 0 0 18px #facc15;
            animation: hfDotDown 1.35s linear infinite;
          }

          .hf-lane-h i {
            top: -1.5px;
            animation: hfDotRight 1.55s linear infinite;
          }

          .hf-grid-flow i {
            background: #a78bfa;
            box-shadow: 0 0 18px #a78bfa;
          }

          .hf-battery-flow i {
            background: #22c55e;
            box-shadow: 0 0 18px #22c55e;
          }

          .hf-lane-h.reverse i {
            animation-name: hfDotLeft;
          }

          .hf-lane i:nth-of-type(2) {
            animation-delay: .45s;
          }

          .hf-lane i:nth-of-type(3) {
            animation-delay: .9s;
          }

          .hf-lane em {
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

          .hf-lane-v em {
            left: 18px;
            top: 12px;
          }

          .hf-lane-h em {
            left: 50%;
            top: -31px;
            transform: translateX(-50%);
          }

          @keyframes hfDotDown {
            0% { top: -10px; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: calc(100% + 5px); opacity: 0; }
          }

          @keyframes hfDotRight {
            0% { left: -10px; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { left: calc(100% + 5px); opacity: 0; }
          }

          @keyframes hfDotLeft {
            0% { left: calc(100% + 5px); opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { left: -10px; opacity: 0; }
          }

          .hf-inverter {
            width: fit-content;
            margin: 14px auto 0;
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 8px 13px;
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent);
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--homeon-muted);
            box-shadow: 0 10px 26px rgba(0,0,0,.05);
          }

          .hf-inverter ha-icon {
            width: 18px;
            height: 18px;
          }

          .hf-inverter span {
            font-size: 12px;
          }

          .hf-inverter b {
            color: var(--homeon-text);
            font-size: 12px;
            font-weight: 900;
          }

          .hf-summary {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
            margin-top: 12px;
          }

          .hf-summary div {
            border: 1px solid var(--homeon-border);
            border-radius: 16px;
            padding: 11px 12px;
            background: color-mix(in srgb, var(--homeon-bg) 88%, transparent);
            display: flex;
            gap: 8px;
            align-items: center;
            min-width: 0;
          }

          .hf-summary ha-icon {
            color: var(--homeon-accent);
            flex: 0 0 auto;
          }

          .hf-summary span {
            color: var(--homeon-muted);
            font-size: 12px;
            flex: 1;
            min-width: 0;
          }

          .hf-summary b {
            font-size: 13px;
            font-weight: 900;
            white-space: nowrap;
          }

          @media (max-width: 980px) {
            .brand img {
              width: 132px !important;
              height: 72px !important;
              min-width: 132px !important;
              min-height: 72px !important;
            }

            .hf-mid {
              grid-template-columns: 1fr;
            }

            .hf-lane-h {
              height: 42px;
              min-width: 9px;
              width: 9px;
              justify-self: center;
            }

            .hf-lane-h i {
              left: -1.5px;
              top: auto;
              animation-name: hfDotDown;
            }

            .hf-lane-h.reverse i {
              animation-name: hfDotDown;
            }

            .hf-lane-h em {
              left: 18px;
              top: 8px;
              transform: none;
            }

            .hf-summary {
              grid-template-columns: 1fr;
            }
          }


          .deye-card {
            border: 1px solid var(--homeon-border);
            border-radius: 22px;
            padding: 16px;
            background:
              radial-gradient(circle at 12% 20%, rgba(56,189,248,.10), transparent 25%),
              radial-gradient(circle at 88% 20%, rgba(34,197,94,.10), transparent 25%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015));
          }

          .deye-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 14px;
          }

          .deye-head h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: -.02em;
          }

          .deye-head p {
            margin: 4px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
            line-height: 1.35;
          }

          .deye-pill {
            max-width: 360px;
            border: 1px solid var(--homeon-border);
            border-radius: 999px;
            padding: 7px 12px;
            background: var(--homeon-bg);
            font-size: 12px;
            font-weight: 850;
            white-space: normal;
            text-align: right;
          }

          .deye-top-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
            margin-bottom: 12px;
          }

          .deye-change-main {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .deye-panel {
            border: 1px solid var(--homeon-border);
            border-radius: 16px;
            padding: 12px;
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent);
          }

          .deye-important {
            border-color: rgba(34,197,94,.45);
            background:
              radial-gradient(circle at 0% 0%, rgba(34,197,94,.12), transparent 32%),
              color-mix(in srgb, var(--homeon-bg) 90%, transparent);
          }

          .deye-panel-title {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--homeon-muted);
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 8px;
          }

          .deye-panel-title ha-icon {
            color: var(--homeon-accent);
            width: 20px;
            height: 20px;
          }

          .deye-panel-text {
            font-size: 13px;
            font-weight: 750;
            line-height: 1.45;
            color: var(--homeon-text);
            overflow-wrap: anywhere;
            white-space: pre-wrap;
          }

          @media (max-width: 900px) {
            .deye-top-grid {
              grid-template-columns: 1fr;
            }

            .deye-head {
              flex-direction: column;
            }

            .deye-pill {
              max-width: none;
              text-align: left;
            }
          }

          /* UKRYWANIE PUSTYCH KAFELKOW 0.2.32 */

          .section-card {
            margin-top: 14px !important;
          }

          .section-head {
            margin-bottom: 10px !important;
          }

          .grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)) !important;
            gap: 10px !important;
            align-items: stretch !important;
          }

          .tile {
            min-height: 58px !important;
            padding: 10px 12px !important;
          }

          .tile div {
            min-width: 0 !important;
          }

          .tile span {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .tile b {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .deye-change-main,
          .hf-summary,
          .pf-summary {
            gap: 10px !important;
          }

          @media (max-width: 900px) {
            .grid {
              grid-template-columns: 1fr !important;
            }
          }


          /* HOMEON 0.2.33 - PREMIUM BOTTOM LAYOUT */

          .section-card {
            position: relative !important;
            margin-top: 16px !important;
            padding: 16px !important;
            border-radius: 24px !important;
            border: 1px solid var(--homeon-border) !important;
            background:
              radial-gradient(circle at 0% 0%, rgba(56,189,248,.075), transparent 34%),
              radial-gradient(circle at 100% 0%, rgba(34,197,94,.060), transparent 30%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015)) !important;
            overflow: hidden !important;
          }

          .section-card::before {
            content: "" !important;
            position: absolute !important;
            left: 16px !important;
            right: 16px !important;
            top: 0 !important;
            height: 1px !important;
            background: linear-gradient(90deg, transparent, rgba(56,189,248,.35), transparent) !important;
            pointer-events: none !important;
          }

          .section-head {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 12px !important;
            margin-bottom: 12px !important;
          }

          .section-head h3 {
            margin: 0 !important;
            font-size: 18px !important;
            line-height: 1.15 !important;
            font-weight: 950 !important;
            letter-spacing: -.03em !important;
          }

          .section-head p {
            margin: 5px 0 0 !important;
            max-width: 760px !important;
            color: var(--homeon-muted) !important;
            font-size: 12px !important;
            line-height: 1.35 !important;
          }

          .section-card .grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(245px, 1fr)) !important;
            gap: 10px !important;
            align-items: stretch !important;
          }

          .section-card .tile {
            min-height: 64px !important;
            padding: 10px 12px !important;
            border-radius: 18px !important;
            border: 1px solid color-mix(in srgb, var(--homeon-border) 86%, transparent) !important;
            background:
              linear-gradient(145deg, color-mix(in srgb, var(--homeon-bg) 94%, transparent), color-mix(in srgb, var(--homeon-bg) 82%, transparent)) !important;
            box-shadow: 0 10px 24px rgba(0,0,0,.045) !important;
            display: flex !important;
            align-items: center !important;
            gap: 11px !important;
            transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease !important;
          }

          .section-card .tile:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 14px 30px rgba(0,0,0,.065) !important;
            border-color: color-mix(in srgb, var(--homeon-accent) 34%, var(--homeon-border)) !important;
          }

          .section-card .tile ha-icon {
            width: 22px !important;
            height: 22px !important;
            min-width: 22px !important;
            color: var(--homeon-accent) !important;
            filter: drop-shadow(0 0 10px color-mix(in srgb, var(--homeon-accent) 32%, transparent)) !important;
          }

          .section-card .tile div {
            min-width: 0 !important;
            width: 100% !important;
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) auto !important;
            align-items: center !important;
            column-gap: 10px !important;
            row-gap: 2px !important;
          }

          .section-card .tile span {
            min-width: 0 !important;
            color: var(--homeon-muted) !important;
            font-size: 12px !important;
            font-weight: 650 !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .section-card .tile b {
            color: var(--homeon-text) !important;
            font-size: 14px !important;
            line-height: 1.2 !important;
            font-weight: 950 !important;
            text-align: right !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 210px !important;
          }

          .section-card .tile b:empty {
            display: none !important;
          }

          .section-card .tile b:not(:empty) {
            padding: 4px 8px !important;
            border-radius: 999px !important;
            background: color-mix(in srgb, var(--homeon-accent) 9%, transparent) !important;
          }

          .deye-card {
            margin-top: 16px !important;
            border-radius: 24px !important;
            padding: 16px !important;
            background:
              radial-gradient(circle at 0% 0%, rgba(34,197,94,.10), transparent 32%),
              radial-gradient(circle at 100% 0%, rgba(56,189,248,.10), transparent 32%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015)) !important;
          }

          .deye-top-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)) !important;
            gap: 10px !important;
          }

          .deye-panel {
            border-radius: 18px !important;
            padding: 12px 13px !important;
            background:
              linear-gradient(145deg, color-mix(in srgb, var(--homeon-bg) 94%, transparent), color-mix(in srgb, var(--homeon-bg) 84%, transparent)) !important;
            box-shadow: 0 10px 24px rgba(0,0,0,.045) !important;
          }

          .deye-panel-title {
            margin-bottom: 7px !important;
          }

          .deye-panel-text {
            font-size: 12px !important;
            line-height: 1.42 !important;
            max-height: 92px !important;
            overflow: auto !important;
            padding-right: 4px !important;
          }

          .deye-important .deye-panel-text {
            max-height: 130px !important;
            font-weight: 850 !important;
          }

          .hf-summary,
          .pf-summary {
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)) !important;
          }

          @media (min-width: 1100px) {
            .section-card .grid {
              grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            }

            .section-card:nth-of-type(n+4) .grid {
              grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 760px) {
            .section-card {
              padding: 13px !important;
              border-radius: 20px !important;
            }

            .section-card .grid {
              grid-template-columns: 1fr !important;
            }

            .section-card .tile div {
              grid-template-columns: 1fr !important;
            }

            .section-card .tile b {
              text-align: left !important;
              max-width: none !important;
              width: fit-content !important;
            }
          }


          /* HOMEON 0.2.34 - CZYTELNY RYNEK ENERGII */

          .market-section {
            background:
              radial-gradient(circle at 0% 0%, rgba(250,204,21,.10), transparent 34%),
              radial-gradient(circle at 100% 0%, rgba(56,189,248,.08), transparent 30%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015)) !important;
          }

          .market-section .section-head h3 {
            font-size: 20px !important;
          }

          .market-section .grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
            gap: 12px !important;
          }

          .market-section .tile {
            min-height: 86px !important;
            align-items: flex-start !important;
            padding: 13px 14px !important;
            border-radius: 18px !important;
          }

          .market-section .tile ha-icon {
            margin-top: 2px !important;
            width: 24px !important;
            height: 24px !important;
            min-width: 24px !important;
          }

          .market-section .tile div {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
            gap: 7px !important;
            min-width: 0 !important;
            width: 100% !important;
          }

          .market-section .tile span {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            line-height: 1.25 !important;
            font-size: 12.5px !important;
            font-weight: 750 !important;
            max-width: 100% !important;
            color: var(--homeon-muted) !important;
          }

          .market-section .tile b {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            overflow-wrap: anywhere !important;
            word-break: break-word !important;
            text-align: left !important;
            max-width: 100% !important;
            width: fit-content !important;
            line-height: 1.25 !important;
            font-size: 15px !important;
            font-weight: 950 !important;
            padding: 5px 9px !important;
          }

          .market-section .tile-bestselltime b,
          .market-section .tile-nextbetterselltime b {
            font-size: 13.5px !important;
          }

          .market-section .tile-buyprice b,
          .market-section .tile-sellprice b,
          .market-section .tile-bestsellprice b,
          .market-section .tile-nextbettersellprice b {
            font-size: 16px !important;
          }

          @media (min-width: 1200px) {
            .market-section .grid {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 760px) {
            .market-section .grid {
              grid-template-columns: 1fr !important;
            }

            .market-section .tile {
              min-height: 74px !important;
            }
          }


          /* HOMEON 0.2.35 - PV REALITY VISUAL */

          .pv-reality-card {
            position: relative;
            border: 1px solid var(--homeon-border);
            border-radius: 24px;
            padding: 18px;
            overflow: hidden;
            background:
              radial-gradient(circle at 0% 0%, rgba(250,204,21,.14), transparent 34%),
              radial-gradient(circle at 100% 0%, rgba(34,197,94,.10), transparent 32%),
              radial-gradient(circle at 50% 120%, rgba(56,189,248,.09), transparent 38%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015));
          }

          .pv-reality-card::before {
            content: "";
            position: absolute;
            left: 18px;
            right: 18px;
            top: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(250,204,21,.55), rgba(34,197,94,.45), transparent);
            pointer-events: none;
          }

          .pv-reality-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 16px;
          }

          .pv-reality-head h3 {
            margin: 0;
            font-size: 20px;
            line-height: 1.15;
            font-weight: 950;
            letter-spacing: -.03em;
          }

          .pv-reality-head p {
            margin: 5px 0 0;
            color: var(--homeon-muted);
            font-size: 12.5px;
            line-height: 1.4;
            max-width: 820px;
          }

          .pv-reality-status {
            border: 1px solid var(--homeon-border);
            border-radius: 18px;
            padding: 10px 12px;
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent);
            min-width: 210px;
            text-align: right;
          }

          .pv-reality-status span {
            display: block;
            font-size: 15px;
            font-weight: 950;
            color: var(--homeon-text);
          }

          .pv-reality-status b {
            display: block;
            margin-top: 3px;
            color: var(--homeon-muted);
            font-size: 11.5px;
            font-weight: 750;
          }

          .pv-reality-main {
            display: grid;
            grid-template-columns: 210px minmax(0, 1fr);
            gap: 16px;
            align-items: center;
          }

          .pv-reality-score {
            display: grid;
            place-items: center;
          }

          .pv-score-ring {
            --pv-score: 0;
            width: 172px;
            height: 172px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background:
              conic-gradient(
                #22c55e calc(var(--pv-score) * 1%),
                rgba(148,163,184,.22) 0
              );
            box-shadow: 0 18px 44px rgba(0,0,0,.10);
          }

          .pv-score-ring > div {
            width: 126px;
            height: 126px;
            border-radius: 50%;
            background: color-mix(in srgb, var(--homeon-bg) 94%, transparent);
            display: grid;
            place-items: center;
            align-content: center;
            border: 1px solid var(--homeon-border);
          }

          .pv-score-ring strong {
            font-size: 34px;
            font-weight: 950;
            letter-spacing: -.05em;
            color: var(--homeon-text);
          }

          .pv-score-ring span {
            color: var(--homeon-muted);
            font-size: 12px;
            font-weight: 800;
          }

          .pv-reality-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }

          .pv-reality-grid .tile {
            min-height: 68px !important;
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent) !important;
          }

          .pv-reality-grid .tile span {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            line-height: 1.2 !important;
          }

          .pv-reality-grid .tile b {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            text-align: right !important;
            max-width: 160px !important;
            overflow-wrap: anywhere !important;
          }

          .pv-reality-progress {
            margin-top: 12px;
            border: 1px solid var(--homeon-border);
            border-radius: 18px;
            padding: 12px;
            background: color-mix(in srgb, var(--homeon-bg) 88%, transparent);
          }

          .pv-reality-progress div {
            height: 12px;
            border-radius: 999px;
            background: rgba(148,163,184,.22);
            overflow: hidden;
          }

          .pv-reality-progress span {
            display: block;
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #facc15, #22c55e);
          }

          .pv-reality-progress p {
            margin: 8px 0 0;
            color: var(--homeon-muted);
            font-size: 12px;
            line-height: 1.35;
          }

          .pv-reality-reason {
            margin-top: 12px;
            border: 1px solid var(--homeon-border);
            border-radius: 18px;
            padding: 12px 13px;
            display: flex;
            gap: 10px;
            align-items: flex-start;
            background: color-mix(in srgb, var(--homeon-bg) 90%, transparent);
            color: var(--homeon-text);
            font-size: 13px;
            line-height: 1.45;
            font-weight: 750;
            overflow-wrap: anywhere;
          }

          .pv-reality-reason ha-icon {
            color: var(--homeon-accent);
            flex: 0 0 auto;
            width: 22px;
            height: 22px;
          }

          .pv-reality-bad .pv-score-ring {
            background:
              conic-gradient(
                #ef4444 calc(var(--pv-score) * 1%),
                rgba(148,163,184,.22) 0
              );
          }

          .pv-reality-weak .pv-score-ring {
            background:
              conic-gradient(
                #f97316 calc(var(--pv-score) * 1%),
                rgba(148,163,184,.22) 0
              );
          }

          .pv-reality-ok .pv-score-ring {
            background:
              conic-gradient(
                #facc15 calc(var(--pv-score) * 1%),
                rgba(148,163,184,.22) 0
              );
          }

          .pv-reality-good .pv-score-ring {
            background:
              conic-gradient(
                #22c55e calc(var(--pv-score) * 1%),
                rgba(148,163,184,.22) 0
              );
          }

          .pv-reality-bad {
            border-color: rgba(239,68,68,.45);
            background:
              radial-gradient(circle at 0% 0%, rgba(239,68,68,.16), transparent 34%),
              radial-gradient(circle at 100% 0%, rgba(249,115,22,.10), transparent 32%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015));
          }

          .pv-reality-good {
            border-color: rgba(34,197,94,.38);
          }

          @media (max-width: 900px) {
            .pv-reality-head {
              flex-direction: column;
            }

            .pv-reality-status {
              min-width: 0;
              width: 100%;
              text-align: left;
              box-sizing: border-box;
            }

            .pv-reality-main {
              grid-template-columns: 1fr;
            }

            .pv-reality-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          @media (max-width: 560px) {
            .pv-reality-grid {
              grid-template-columns: 1fr;
            }

            .pv-score-ring {
              width: 150px;
              height: 150px;
            }

            .pv-score-ring > div {
              width: 110px;
              height: 110px;
            }

            .pv-score-ring strong {
              font-size: 30px;
            }
          }


          /* HOMEON 0.2.38 - NEGATIVE PRICE PLANNER */

          .negative-section {
            border-color: rgba(250,204,21,.42) !important;
            background:
              radial-gradient(circle at 0% 0%, rgba(250,204,21,.16), transparent 34%),
              radial-gradient(circle at 100% 0%, rgba(56,189,248,.10), transparent 32%),
              linear-gradient(145deg, rgba(127,127,127,.045), rgba(127,127,127,.015)) !important;
          }

          .negative-section .section-head h3::after {
            content: "  ·  arbitraż";
            color: var(--homeon-muted);
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0;
          }

          .negative-section .grid {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
          }

          .negative-section .tile {
            min-height: 74px !important;
          }

          .negative-section .tile span,
          .negative-section .tile b {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            overflow-wrap: anywhere !important;
          }

        </style>

        <div class="wrap">
          ${this.hero()}

          ${this.powerFlow()}

          ${this.pvRealityCard()}

          ${this.negativePriceCard()}

          ${this.deyeInspector()}

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
            "Panel operatorski 0.2.44",
            "Najważniejsze zabezpieczenia, ekonomia sprzedaży, histereza trybu i driver Deye.",
            this.grid([
              "mode",
              "modeCandidate",
              "modeHysteresis",
              "modeHoldRemaining",
              "safeMode",
              "dataQualityStatus",
              "economicProfit",
              "economicSellReady",
              "economicSellReason",
              "deyeDriverSafety",
              "deyeDriverBlock",
              "deyeDriverChangedRuntime"
            ])
          )}

          ${this.section(
            "Bezpieczeństwo EMS",
            "Diagnostyka jakości danych i blokady SAFE_MODE.",
            this.grid([
              "dataQualityStatus",
              "dataQualityScore",
              "dataQualityErrors",
              "dataQualityWarnings",
              "dataQualityLastOk",
              "safeMode",
              "safeModeReason",
              "safeModeAction"
            ])
          )}

          ${this.section(
            "Ekonomia i stabilność trybu",
            "Progi ekonomiczne, gotowość sprzedaży oraz minimalny czas utrzymania trybu.",
            this.grid([
              "economicProfit",
              "economicSellReady",
              "economicSellReason",
              "economicCycleCost",
              "modeCandidate",
              "modeHysteresis",
              "modeHysteresisReason",
              "modeHoldRemaining",
              "modeMinHold"
            ])
          )}

          ${this.section(
            "Deye Safe Driver",
            "Warstwa bezpieczeństwa realnych komend wysyłanych do falownika.",
            this.grid([
              "deyeDriverSafety",
              "deyeDriverBlock",
              "deyeDriverMinInterval",
              "deyeDriverMaxChanges",
              "deyeDriverChangedRuntime",
              "deyeDriverHash",
              "deyePlan",
              "deyeChangedOnly",
              "deyeTestMode"
            ])
          )}
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
            HomeOn Energy Card 0.2.44 · animowany przepływ energii · pełna diagnostyka EMS
          </div>
        </div>
      </ha-card>
    `;
  }
}




/* HOMEON 0.2.40.5 - SUBCLASS CUSTOM ELEMENT REGISTRATION */
(() => {
  const tagName = "homeon-energy-card-v044";

  try {
    if (window.customElements.get(tagName)) {
      console.info("HomeOn Energy Card 0.2.44 already registered");
      return;
    }

    class HomeOnEnergyCardV044Element extends HomeOnEnergyCardV044 {}

    window.customElements.define(tagName, HomeOnEnergyCardElement);
    console.info("HomeOn Energy Card 0.2.44 loaded");
  } catch (err) {
    console.warn("HomeOn Energy Card registration skipped safely:", err);
  }
})();
