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
    let commandArr: string[] = command.split(" ");
    if (commandArr[0].toLocaleLowerCase() === "b") {
        addOneWayConToGraph(commandArr[1], commandArr[2]);
    } else if (commandArr[0].toLocaleLowerCase() === "t") {
        searchForConBetw(commandArr[1], commandArr[2]);
    } else {
        console.log("incorrect input");
    }
}

function addOneWayConToGraph(nodeA: string, nodeB: string) {
    console.log("creating direct one-way connection between", nodeA, nodeB);
    if (graph.hasOwnProperty(nodeA)) {
        graph[nodeA].push(nodeB)
    } else {
        graph[nodeA] = [nodeB];
    }
    if (!graph.hasOwnProperty(nodeB)) {
        graph[nodeB] = [];
    }
}

// one way search for connection
function searchForConBetw(start: string, end: string): boolean {
    if (graph.hasOwnProperty(start)) {
        let search_queue: string[] = graph[start];
        let curExamPerson: string = "";
        let testedPeople: string[] = [];
        while (search_queue.length !== 0) {
            // Array.shift() removes firts element of an array
            curExamPerson = search_queue.shift();
            if (!testedPeople.includes(curExamPerson)) {
                if (curExamPerson === end) {
                    console.log("connection between", start, "and", end, "was found");
                    return true;
                } else {
                    search_queue = search_queue.concat(graph[curExamPerson]);
                    testedPeople.push(curExamPerson);
                }
            }
        }
        console.log("no connection between", start, "and", end, "was found");
        return false;
    } else {
        console.log("no connection between", start, "and", end, "was found");
        return false;
    }
}


function main() {
    for (let command of commands) {
        execCommand(command);
    }
}

main();
