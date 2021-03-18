import { Decision } from "./customTypes";

class Connection {

    private curGuess: number;
    private prevGuess: number;
    private lastHint: Decision;
    private isGameOver: boolean;

    public constructor(curGuess: number, prevGuess: number,
        lastHint: Decision, isGameOver: boolean) {
        this.curGuess = curGuess;
        this.prevGuess = prevGuess;
        this.lastHint = lastHint;
        this.isGameOver = isGameOver;
    }

    public getCurGuess(): number {
        return this.curGuess;
    }

    public setCurGuess(newGuess: number): void {
        this.curGuess = newGuess;
    }

    public getPrevGuess(): number {
        return this.prevGuess;
    }

    public setPrevGuess(newGuess: number): void {
        this.prevGuess = newGuess;
    }

    public getLastHint(): Decision {
        return this.lastHint;
    }

    public setLastHint(newHint: Decision): void {
        this.lastHint = newHint;
    }

    public getIsGameOver(): boolean {
        return this.isGameOver;
    }

    public setIsGameOver(newIsOver: boolean): void {
        this.isGameOver = newIsOver;
    }

}

export default Connection;
