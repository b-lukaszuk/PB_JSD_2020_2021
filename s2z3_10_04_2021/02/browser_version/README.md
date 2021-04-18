# Task 2

Chess board.

Program is to choose at random one of the chess piece (except the pawn) and place it at the random spot on the board.

After placing any piece (except first one) check all present pieces move ranges and see if any can reach other piece. If so Give that pieces position and quit program. FACTORY (with class hierarhy) + SINGLETON pattern

# Uwagi

**Dodano obsluge piona (nie jest wymagane).**
W sumie krol tez jest klopotliwy (krol do krola sie nie przytula).
**Dodano obsluge krola.**

"Except first one" - niejasne sformulowanie.
Na cwiczeniach Karol mowil, ze po prostu maja byc dwie bierki na szachownicy.

**Najpierw utworzono terminal-version, potem zamiana na browser-version (w Angularze)
Browser version moze zawierac (niepotrzebne) pozostalosci z terminal-version.**

# Uruchomienie

```bash
cd simplified-chess
ng serve -o # opens localhost://4200 in the browser
```
