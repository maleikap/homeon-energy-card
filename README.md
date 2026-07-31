<p align="center">
  <img src="homeon_logo.svg" alt="HomeOn" width="520">
</p>

<h1 align="center">HomeOn Energy Card</h1>

<p align="center">
  Czytelna karta Lovelace dla instalacji fotowoltaicznej, magazynu energii i HomeOn Energy Manager.
</p>

<p align="center">
  <a href="https://github.com/maleikap/homeon-energy-card/releases"><img src="https://img.shields.io/github/v/release/maleikap/homeon-energy-card" alt="Latest release"></a>
  <a href="https://github.com/maleikap/homeon-energy-card"><img src="https://img.shields.io/badge/Home%20Assistant-HACS-41BDF5" alt="Home Assistant HACS"></a>
  <a href="https://buycoffee.to/homeon"><img src="https://img.shields.io/badge/Support%20HomeOn-BuyCoffee-F6C344" alt="Support HomeOn on BuyCoffee"></a>
</p>

## Przeznaczenie

HomeOn Energy Card 1.0.0 jest uproszczonym widokiem przeznaczonym do codziennego użytkowania przez właściciela instalacji. Karta pokazuje wyłącznie najważniejsze informacje:

- aktualną decyzję HomeOn Energy Manager,
- produkcję PV, zużycie domu, pracę magazynu i wymianę z siecią,
- poziom oraz cele magazynu energii,
- ceny zakupu i sprzedaży energii,
- prognozę produkcji PV,
- najbliższą zaplanowaną akcję,
- dzienną wartość sprzedaży, koszt zakupu i wynik finansowy.

Techniczna diagnostyka Deye, lista encji, komendy wykonawcze i szczegóły modelu uczącego nie są prezentowane w widoku klienta.

## Wymagane elementy

| Element | Zastosowanie |
| --- | --- |
| Home Assistant 2025.1 lub nowszy | Środowisko uruchomieniowe |
| HACS | Automatyczna instalacja i aktualizacja karty |
| [HomeOn Energy Manager](https://github.com/maleikap/homeon-energy-manager) | Logika EMS, cele baterii, plan i podstawowe encje karty |
| Integracja falownika Deye/Solarman lub zgodna | SOC, moc baterii, PV, domu i sieci oraz sterowanie falownikiem |
| Integracja taryfy dynamicznej | Aktualne ceny zakupu i sprzedaży energii |

## Integracje zalecane do pełnej funkcjonalności

### Pstryk AIO

Pstryk AIO dostarcza ceny dynamiczne oraz dzienny bilans finansowy. Wykres finansowy wykorzystuje domyślnie:

```text
sensor.pstryk_aio_dzienna_wartosc_produkcji_energii
sensor.pstryk_aio_dzienne_koszty_zuzycia_energii
```

Pierwsza encja oznacza dzienną wartość sprzedanej energii, a druga dzienny koszt energii kupionej. Są to wartości pieniężne, a nie energia w kWh.

### Prognoza produkcji PV

Do dokładnego planowania magazynu zalecana jest jedna z integracji:

- Forecast.Solar,
- Solcast PV Forecast,
- inne źródło udostępniające prognozę produkcji dzisiaj i jutro.

Szczegółowe encje Forecast.Solar i Solcast są wykorzystywane przez HomeOn Energy Manager. Brak prognozy nie blokuje samego wyświetlania karty, ale ogranicza jakość planowania.

### Integracja falownika

HomeOn Energy Manager potrzebuje co najmniej:

- SOC magazynu,
- mocy baterii,
- mocy PV,
- mocy domu,
- mocy sieci,
- przełącznika ładowania z sieci,
- przełącznika eksportu nadwyżki,
- nastawy mocy eksportu,
- nastawy maksymalnego prądu ładowania i rozładowania,
- encji trybu pracy Deye, jeżeli manager ma przełączać `Export First` i `Zero Export To CT`.

Nazwy encji zależą od użytej integracji falownika i konfiguracji Home Assistant.

## Instalacja przez HACS

1. W HACS otwórz menu repozytoriów niestandardowych.
2. Dodaj repozytorium jako typ **Dashboard**:

```text
https://github.com/maleikap/homeon-energy-card
```

3. Pobierz HomeOn Energy Card.
4. Odśwież frontend Home Assistant.
5. Dodaj kartę do dashboardu.

HACS instaluje skrypt karty oraz oryginalne logo HomeOn automatycznie. Nie należy kopiować plików ręcznie do `/config/www`.

## Konfiguracja

Konfiguracja minimalna:

```yaml
type: custom:homeon-energy-card
```

Opcjonalny tytuł:

```yaml
type: custom:homeon-energy-card
title: HomeOn Energy Dashboard
```

Jeżeli encje finansowe Pstryk mają inne identyfikatory:

```yaml
type: custom:homeon-energy-card
sale_value_entity: sensor.twoja_wartosc_sprzedazy_dzisiaj
purchase_cost_entity: sensor.twoj_koszt_zakupu_dzisiaj
```

Oryginalne logo jest dostarczane razem z wydaniem HACS i używane automatycznie.

## Brakujące dane

Sekcja finansowa jest ukrywana, jeżeli obie skonfigurowane encje finansowe nie istnieją. Pozostałe pola są wyszukiwane automatycznie wśród encji HomeOn Energy Manager. Brak integracji opcjonalnej nie powinien zatrzymać całej karty.

## Aktualizacje

Nowe wersje są publikowane jako wydania GitHub i pobierane przez HACS. Po aktualizacji może być wymagane twarde odświeżenie aplikacji lub przeglądarki Home Assistant.

## Powiązane projekty

- [HomeOn Energy Manager](https://github.com/maleikap/homeon-energy-manager)
- [Zgłoszenia problemów](https://github.com/maleikap/homeon-energy-card/issues)
- [Historia zmian](CHANGELOG.md)

## Wsparcie projektu

Rozwój HomeOn można wesprzeć przez [BuyCoffee](https://buycoffee.to/homeon).
