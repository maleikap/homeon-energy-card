# HomeOn Energy Card

Pełny dashboard Lovelace dla HomeOn Energy Manager.

Karta pokazuje:
- aktualny tryb EMS,
- animowany przepływ energii PV / dom / bateria / sieć / falownik,
- cele baterii,
- powód decyzji EMS,
- sterowanie falownikiem Deye / Solarman,
- plan następnych 24h,
- uczenie EMS,
- bilans energii od startu nauki.

## Wymagania

1. Home Assistant.
2. HACS.
3. Zainstalowana integracja HomeOn Energy Manager.
4. Encje HomeOn Energy Manager utworzone w HA.

## Instalacja przez HACS jako custom repository

1. Wejdź w Home Assistant.
2. Otwórz HACS.
3. Wejdź w Frontend.
4. Kliknij trzy kropki w prawym górnym rogu.
5. Wybierz Custom repositories.
6. Wklej adres repozytorium:

   https://github.com/maleikap/homeon-energy-card

7. Jako typ wybierz Dashboard.
8. Kliknij Add.
9. Wyszukaj HomeOn Energy Card.
10. Kliknij Download.
11. Zrestartuj albo odśwież Home Assistant.

## Dodanie zasobu ręcznie

Jeżeli HACS sam nie doda zasobu, dodaj go ręcznie:

Ustawienia → Panele → Zasoby → Dodaj zasób

Adres URL:

/hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.22

Typ:

JavaScript module

## Instalacja lokalna bez HACS

Skopiuj plik JS do:

/config/www/community/homeon-energy-card/homeon-energy-card.js

Dodaj zasób:

/local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.22

Typ:

JavaScript module

## Użycie w dashboardzie

Dodaj kartę ręcznie w Lovelace:

type: custom:homeon-energy-card

Można też użyć aliasu:

type: custom:homeon-energy-dashboard

## Przykład pełny

type: custom:homeon-energy-card
title: HomeOn Energy Dashboard

## Wymuszenie odświeżenia cache

Po aktualizacji zmień końcówkę zasobu na aktualną wersję:

/hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.22

albo:

/local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.22

Następnie zrób twarde odświeżenie przeglądarki:

CTRL + F5

## Diagnostyka

Jeżeli karta się nie ładuje:

1. Sprawdź, czy zasób JS jest dodany jako JavaScript module.
2. Sprawdź, czy po adresie zasobu w przeglądarce otwiera się plik JS.
3. Sprawdź konsolę przeglądarki.
4. Zmień parametr cache v= na nowszy.
5. Upewnij się, że typ karty to:

type: custom:homeon-energy-card

## Wersja

0.2.22
