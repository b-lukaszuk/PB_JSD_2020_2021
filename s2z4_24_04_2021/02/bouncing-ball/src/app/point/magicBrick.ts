import Point from "./point";
import randInt from "../utils/randInt";

class MagicBrick extends Point {
    public constructor(x: number, y: number) {
        super(x, y);
    }

    public add(other: Point): Point {
        let newX: number, newY: number;
        do {
            newX = randInt(-1, 1);
            newY = randInt(-1, 1);
        } while (newX === 0 || newY === 0 ||
            (newX === other.getX() && newY === other.getY()))
        return new Point(newX, newY);
    }
}

export default MagicBrick;
