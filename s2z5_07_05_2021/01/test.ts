// let commands: string[] = [
//     "B 1 2",
//     "B 1 3",
//     "B 10 11",
//     "T 1 3",
//     "T 10 2",
//     "B 11 2",
//     "T 10 3",
//     "T 100 103",
// ]

// graph of connections
let graph = {};

function execCommand(command: string) {
    let commandArr: string[] = command.split(" ");
    if (commandArr[0].toLocaleLowerCase() === "b") {
        // build nodes
    }
    if (commandArr[0].toLocaleLowerCase() === "t") {
        // test nodes existence
    }
}

function addOneWayConToGraph(nodeA: string, nodeB: string) {
    console.log("creating direct two-way connection between", nodeA, nodeB);
    if (graph.hasOwnProperty(nodeA)) {
        graph[nodeA].push(nodeB)
    } else {
        graph[nodeA] = [nodeB];
    }
    if (!graph.hasOwnProperty(nodeB)) {
        graph[nodeB] = [];
    }
}

addOneWayConToGraph("you", "alice");
addOneWayConToGraph("you", "bob");
addOneWayConToGraph("you", "claire");
addOneWayConToGraph("bob", "anuj");
addOneWayConToGraph("bob", "peggy");
addOneWayConToGraph("alice", "peggy");
addOneWayConToGraph("claire", "thom");
addOneWayConToGraph("claire", "jonny");

console.log(graph);

