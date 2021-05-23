import Point from "./point";
import randInt from "../utils/randInt";
import Brick from './brick';

class MagicBrick extends Brick {
    public constructor(x: number, y: number) {
        super(x, y, false, false);
    }

    public add(shift: Point): Point {
        let negateX: boolean, negateY: boolean;
        let newX: number, newY: number;
        do {
            negateX = randInt(2) === 1 ? true : false;
            negateY = randInt(2) === 1 ? true : false;
        } while ((negateX && negateY) ||
            (!negateX && !negateY))
        newX = negateX ? (shift.getX() * -1) : shift.getX();
        newY = negateY ? (shift.getY() * -1) : shift.getY();
        return new Point(newX, newY);
    }
}

export default MagicBrick;
