class Point {
    private _x: number;
    private _y: number;

    /**
     * @param {number} x - coordinate on 0X axis
     * @param {number} y - coordinate on 0Y axis
     */
    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getX(): number {
        return this._x;
    }

    public setX(newX: number): void {
        this._x = newX;
    }

    public getY(): number {
        return this._y;
    }

    public setY(newY: number): void {
        this._y = newY;
    }

    public getPos(): number[] {
        return [this._x, this._y];
    }

    public equal(other: Point): boolean {
        return this._x === other._x && this._y === other._y;
    }

    /**
     * @param {number} lowIncl - this._x >= lowIncl
     * @param {number} lowIncl - this._x <= higIncl
     */
    public isXBetween(lowIncl: number, highIncl: number): boolean {
        return this._x >= lowIncl && this._x <= highIncl;
    }

    /**
     * @param {number} lowIncl - this._y >= lowIncl
     * @param {number} lowIncl - this._y <= highIncl
     */
    public isYBetween(lowIncl: number, highIncl: number): boolean {
        return this._y >= lowIncl && this._y <= highIncl;
    }

    public add(other: Point): Point {
        let newX: number = this.getX() + other.getX();
        let newY: number = this.getY() + other.getY();
        return new Point(newX, newY);
    }
}

export default Point;
