# HomeOn Energy Card

Karta Lovelace dla HomeOn Energy Manager.

## Co pokazuje karta
- tryb pracy EMS
- poprawny przeplyw energii: PV u gory, dom w srodku, siec po lewej, bateria po prawej
- animowane kropki pokazujace kierunek energii
- cele baterii
- powod decyzji EMS
- sterowanie falownikiem Deye / Solarman
- plan 24h
- uczenie EMS

## Instalacja przez HACS
1. Otworz Home Assistant.
2. Wejdz w HACS.
3. Wejdz w Frontend.
4. Kliknij trzy kropki w prawym gornym rogu.
5. Wybierz Custom repositories.
6. Dodaj repozytorium: https://github.com/maleikap/homeon-energy-card
7. Typ repozytorium ustaw jako Dashboard.
8. Kliknij Add.
9. Wyszukaj HomeOn Energy Card.
10. Kliknij Download.

## Zasob HACS
/hacsfiles/homeon-energy-card/homeon-energy-card.js?v=0.2.25
Typ zasobu: JavaScript module

## Instalacja lokalna bez HACS
Skopiuj plik do: /config/www/community/homeon-energy-card/homeon-energy-card.js
Dodaj zasob: /local/community/homeon-energy-card/homeon-energy-card.js?v=0.2.25
Typ zasobu: JavaScript module

## Uzycie w dashboardzie
type: custom:homeon-energy-card
title: HomeOn Energy Dashboard

Alias:
type: custom:homeon-energy-dashboard

## Wlasne logo
Mozesz podac logo w YAML:
logo: /local/community/homeon-energy-card/homeon_logo.svg?v=0.2.25

## Po aktualizacji
Zmien wersje zasobu na v=0.2.25 i zrob CTRL + F5.
