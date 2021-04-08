///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import MorseCoderDecoder from "./classes/morseCoderDecoder";
import { engToMorse } from "./dictionaries/engToMorse"; // dictionary
import { morseToEng } from "./dictionaries/morseToEng"; // dictionary
// dictionaries were made based on simple morse chart from:
// http://www.csgnetwork.com/morsecodechrtbl.html
// note: they does not include all engl letters
// (e.g. those that come from french) or special characters

///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const coder: MorseCoderDecoder = new MorseCoderDecoder(engToMorse);
const decoder: MorseCoderDecoder = new MorseCoderDecoder(morseToEng);
const messages: Array<string> = ["Hello there", "General Kenobi",
    "SOS", "A"];

///////////////////////////////////////////////////////////////////////////////
//                           functions definitions                           //
///////////////////////////////////////////////////////////////////////////////
/**
 * declare coding/decoding of a message into console
 */
function declareCodDecod(origMsg: string,
    coder: MorseCoderDecoder,
    decoder: MorseCoderDecoder): void {

    let codedMsg: string = coder.translateMsg(origMsg);
    let decodedMsg: string = decoder.translateMsg(codedMsg);

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
        declareCodDecod(message, coder, decoder);
    })
    console.log("That's all. Goodbye!");
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
