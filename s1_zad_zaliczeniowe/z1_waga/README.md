# Tresc

Ponizej tresc zadania, pisownia oryginalna

> Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
> items will be change to two. Indexes are t be chosen at random. 
> Use compressions only two times.

## Niejasnosci i przyjete zalozenia

> "indexes are t be chosen at random"?

- przyjmuje ze zmieniam losowa wartosc w tabeli z 1 na 2

- sugestia niektorych ludzi z roku:
kule sa losowo wybierane do wazenia (just in case zastosuje sie i do tego)

> "Use compressions only two times" - chodzi o "comparisons" (porownania)?

jak mam rozumiec porownanie, tak jak w wazeniu, < lub > lub =
inaczej jesli same if-y/elsy, boole (a > b) to jest chyba niemozliwe
utworze wiec funkcje/metode ktora bedzie imitowac wazenie waga


# Sposob tworzenia tego projektu

```bash
npm init # tworzenie pliku package.json
npm i --save-devs @types/node # dodanie modulu
# (updateuje package.json i package-lock.json)
```
# Przed pierwszym uruchomieniem (po pobraniu z github-a)

```bash
npm install # instaluje potrzebne zaleznosci
```

# Uruchomienie programu

Po transpilacji do JS-a (przy uzyciu tsc).

```bash
node z1.js
```
