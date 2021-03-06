# Task 2

## Tresc


Write a guessing game where the user has to guess a secret number.
After every guess the program tells the user whether their number was too large or too small.
At the end the number of tries needed should be printed.
It counts only as one try if they input the same number multiple times consecutively.
Range 1 - 100.

# Przypomninie

## Sposob tworzenia nowego projektu

```bash
npm init # tworzenie pliku package.json
npm i --save-dev @types/node # dodanie modulu
# (updeateuje package.json i pakgage-lock.json)
```

## Przed pierwszym uruchomieniem (po pobraniu z github-a)


```bash
npm install # instaluje potrzebne zaleznosci
```

## Uruchomienie programu

```bash
tsc z2.ts  # transpilacja do JS-a
node z2.js # uruchomienie progamu
```

opcjonalnie (do ES6)

```bash
tsc z2.ts --target es6 # transpilacja do JS-a w wersji EcmaScript6
node z2.js # uruchomienie progamu
```
