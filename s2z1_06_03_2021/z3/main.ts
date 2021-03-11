///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import ListRotator from "./listRotator";


///////////////////////////////////////////////////////////////////////////////
//                                  zmiennne                                //
///////////////////////////////////////////////////////////////////////////////
const listRot: ListRotator = new ListRotator([1, 2, 3, 4, 5, 6]);
const shift: number = 2;


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
function main(): void {
    console.log("starting list:");
    listRot.printArray();
    listRot.shiftByKelts(shift);
    console.log("after shifting by:", shift);
    console.log("final list:");
    listRot.printArray();
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
