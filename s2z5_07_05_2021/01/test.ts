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

let dictConnections = {};

function execCommand(command: string) {
    let commandArr: string[] = command.split(" ");
    if (commandArr[0].toLocaleLowerCase() === "b") {
        // build nodes
    }
    if (commandArr[0].toLocaleLowerCase() === "t") {
        // test nodes existence
    }
}

function makeOneWayConnectionAB(nodeA: string, nodeB: string) {
    if (dictConnections.hasOwnProperty(nodeA)) {
        dictConnections[nodeA].push(nodeB)
    } else {
        dictConnections[nodeA] = [nodeB];
    }
}

function makeTwoWayConnectionAB(nodeA: string, nodeB: string): void {
    console.log("creating direct two-way connection between", nodeA, nodeB);
    makeOneWayConnectionAB(nodeA, nodeB);
    makeOneWayConnectionAB(nodeB, nodeA);
}

makeTwoWayConnectionAB("1", "2");
makeTwoWayConnectionAB("1", "3");
makeTwoWayConnectionAB("4", "5");
makeTwoWayConnectionAB("4", "3");
console.log(dictConnections);

