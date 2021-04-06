///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import Matrix from "./classes/Matrix";


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
// matr1 and matr2 from:
// https://www.mathsisfun.com/algebra/matrix-multiplying.html
// the correct results of matrix multiplication are there
let matr1: Matrix = new Matrix(
    [[1, 2, 3],
    [4, 5, 6]]);

let matr2: Matrix = new Matrix(
    [[7, 8],
    [9, 10],
    [11, 12]]
);

// matr3 and matr4 from:
// https://www.mathwarehouse.com/algebra/matrix/multiply-matrix.php
// the correct results of matrix multiplication are there
let matr3: Matrix = new Matrix(
    [[3, 2, 1, 5],
    [9, 1, 3, 0]]
);

let matr4: Matrix = new Matrix(
    [[2, 9, 0],
    [1, 3, 5],
    [2, 4, 7],
    [8, 1, 5]]
);

///////////////////////////////////////////////////////////////////////////////
//                           functions definitions                           //
///////////////////////////////////////////////////////////////////////////////
function main() {
    matr1.print();
    console.log("\nmutliplied by:\n");
    matr2.print();
    console.log("\ngives:\n");
    matr1.mult(matr2).print()

    console.log("======\n");

    matr3.print();
    console.log("\nmutliplied by:\n");
    matr4.print();
    console.log("\ngives:\n");
    matr3.mult(matr4).print()
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
