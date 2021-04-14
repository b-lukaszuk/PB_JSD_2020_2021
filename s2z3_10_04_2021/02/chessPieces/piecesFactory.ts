import Bishop from "./bishop";
import King from "./king";
import Knight from "./knight";
import Pawn from "./pawn";
import Piece from "./piece";
import Queen from "./queen";
import Rook from "./rook";
import { Color } from "../dataTypes/color";

class PiecesFactory {
    // nothing todo here
    constructor() {
    }

    /**
     * returns desired piece
     * 0 - pawn, 1 - knight, 2 - bishop, 3 - rook, 4 - queen, 5 - king
     * @param {number} type 0-6 (incl-incl)
     * @param {Color} color color of the piece
     * @returns {Piece} desired piece
     */
    public getPiece(type: number, color: Color): Piece {
        switch (type) {
            case 0:
                return new Pawn(color);
            case 1:
                return new Knight(color);
            case 2:
                return new Bishop(color);
            case 3:
                return new Rook(color);
            case 4:
                return new Queen(color);
            default:
                return new King(color);
        }
    }
}

// singelton required by the task
const singelton = (function() {
    let instance = undefined;

    function init() {
        return new PiecesFactory();
    }

    function getInstance() {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }

    return {
        getPiecesFactoryInstance: getInstance
    }

})();

export default singelton;
