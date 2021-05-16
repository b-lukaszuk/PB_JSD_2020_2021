import Graph from "./graph";

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

let graph: Graph = new Graph();

function getCommandAndArgs(command: string) {
    let sepRegex = /\s+/;
    let commandArr: string[] = command.split(sepRegex);
    return commandArr;
}

function displayConnection(path: string[]): void {
    if (path.length === 0) {
        console.log("no path to display");
    } else {
        let result: string = "";
        for (let i = 0; i < path.length; i++) {
            result += path[i];
            if (i !== (path.length - 1)) {
                result += " --> ";
            }
        }
        console.log(result);
    }
}

function execCommandOnGraph(command: string): void {

    let theCommand: string, nodeAId: string, nodeBId: string;
    [theCommand, nodeAId, nodeBId] = getCommandAndArgs(command);

    if (theCommand.toLocaleLowerCase() === "b") {
        graph.createConnection(nodeAId, nodeBId);
    } else if (theCommand.toLocaleLowerCase() === "t") {
        displayConnection(
            graph.getConnection(nodeAId, nodeBId)
        );
    } else {
        console.log("incorrect command");
    }
}

function main() {
    for (let command of commands) {
        execCommandOnGraph(command);
    }
}

main();
