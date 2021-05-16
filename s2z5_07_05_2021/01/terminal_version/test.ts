let commands: string[] = [
    "B 1 2",
    "B 1 3",
    "B 10 11",
    "T 1 3",
    "T 10 2",
    "B 11 2",
    "T 10 3",
    "T 100 103",
]

// graph of connections
let graph = {};

function execCommand(command: string): void {
    let sepRegex = /\s+/;
    let commandArr: string[] = command.split(sepRegex);
    if (commandArr[0].toLocaleLowerCase() === "b") {
        addTwoWayConToGraph(commandArr[1], commandArr[2]);
    } else if (commandArr[0].toLocaleLowerCase() === "t") {
        searchForConBetw(commandArr[1], commandArr[2]);
    } else {
        console.log("incorrect command");
    }
}

function addOneWayConToGraph(nodeA: string, nodeB: string): void {
    if (graph.hasOwnProperty(nodeA)) {
        graph[nodeA].push(nodeB)
    } else {
        graph[nodeA] = [nodeB];
    }
}

function addTwoWayConToGraph(nodeA: string, nodeB: string): void {
    console.log("creating direct connection between", nodeA, nodeB);
    addOneWayConToGraph(nodeA, nodeB);
    addOneWayConToGraph(nodeB, nodeA);
}

function getArr1EltIfNotInArr2(arr1: string[], arr2: string[]): string[] {
    let result: string[] = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) {
            result.push(arr1[i]);
        }
    }
    return result;
}


// two way search for connection
function searchForConBetw(start: string, end: string): boolean {
    console.log(`testing for connection between ${start} and ${end}:`);
    if (graph.hasOwnProperty(start)) {
        let searchQueue: string[] = [...graph[start]];
        let curExamPerson: string = "";
        let testedPeople: string[] = [start];
        while (searchQueue.length !== 0) {
            // Array.shift() removes firts element of an array
            curExamPerson = searchQueue.shift();
            if (curExamPerson === end) {
                console.log("connection found");
                return true;
            } else {
                searchQueue = searchQueue.concat([...graph[curExamPerson]]);
                testedPeople.push(curExamPerson);
                searchQueue = getArr1EltIfNotInArr2(searchQueue, testedPeople);
            }
        }
        console.log("no connection found");
        return false;
    } else {
        console.log("no connection found");
        return false;
    }
}


function main() {
    for (let command of commands) {
        execCommand(command);
    }
}

main();
