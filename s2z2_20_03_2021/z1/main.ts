///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import MorseCoder from "./classes/morseCoder";
import MorseDecoder from "./classes/morseDecoder";

///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const morseCoder: MorseCoder = new MorseCoder();
const morseDecoder: MorseDecoder = new MorseDecoder();
const messages: Array<string> = ["Hello there", "General Kenobi"];

///////////////////////////////////////////////////////////////////////////////
//                           functions definitions                           //
///////////////////////////////////////////////////////////////////////////////
function declareMorse(origMsg: string): void {
    let codedMsg: string = morseCoder.codeMessage(origMsg);
    let decodedMsg: string = morseDecoder.decodeMessage(codedMsg);

    console.log("===");
    console.log("Original message:", "<<", origMsg, ">>");
    console.log("After coding into Morse code:");
    console.log(codedMsg);
    console.log("After decoding from Morse code:");
    console.log(decodedMsg);
    console.log("===\n");
}


function main() {
    messages.forEach((message) => {
        declareMorse(message);
    })
    console.log("\nThat's all. Goodbye!");
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
