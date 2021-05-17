import Node from "./node";

class Graph {

    private _nodes: Node[] = [];
    private _curExamNode: Node | null = null;
    private _searchQueue: Node[] = [];

    public constructor() {
        // nothing to do here
    }

    public getAllNodes(): Node[] {
        return this._nodes;
    }

    private getNodeById(nodeId: string): Node | null {
        if (this._nodes.length !== 0) {
            for (let node of this._nodes) {
                if (node.getId() === nodeId) {
                    return node;
                }
            }
        }
        return null;
    }

    private getNodesByIds(nodesIds: string[]): Node[] {
        let theNodes: Node[] = this._nodes.filter((node) => {
            return nodesIds.indexOf(node.getId()) !== -1;
        })
        return theNodes;
    }

    private nodeExists(nodeId: string): boolean {
        return this.getNodeById(nodeId) !== null;
    }

    private nodesExist(nodesIds: string[]): boolean[] {
        let result: boolean[] = [];
        for (let i = 0; i < nodesIds.length; i++) {
            result.push(this.nodeExists(nodesIds[i]));
        }
        return result;
    }

    private addNodeNeighbour(nodeId: string, neighbourId: string): void {
        let theNode: Node;
        if (!this.nodeExists(nodeId)) {
            this._nodes.push(new Node(nodeId));
        }
        theNode = this.getNodeById(nodeId);
        theNode.pushNeighbourId(neighbourId);
    }

    private sortNodes(descending: boolean = true) {
        if (descending) {
            this._nodes = this._nodes.sort((nodeA, nodeB) => {
                return nodeB.getNeighboursIds().length -
                    nodeA.getNeighboursIds().length;
            })
        } else {
            this._nodes = this._nodes.sort((nodeA, nodeB) => {
                return nodeA.getNeighboursIds().length -
                    nodeB.getNeighboursIds().length;
            })
        }
    }

    public createConnection(nodeAId: string, nodeBId: string): void {
        console.log(`Creating connection: ${nodeAId} --- ${nodeBId}`);
        this.addNodeNeighbour(nodeAId, nodeBId);
        this.addNodeNeighbour(nodeBId, nodeAId);
        this.sortNodes();
    }

    private removeCheckedNodes(arr: Node[]): Node[] {
        return arr.filter((node) => {
            return !node.getChecked()
        })
    }

    private uncheckAllNodes(): void {
        for (let node of this._nodes) {
            node.uncheckNode();
        }
    }

    private clearAllPahtsToThisNode(): void {
        for (let node of this._nodes) {
            node.clearPathToThisNode();
        }
    }

    private declareNonExistingNodes(theNodesIds: string[],
        theNodesExistence: boolean[]): void {
        for (let i = 0; i < theNodesExistence.length; i++) {
            if (!theNodesExistence[i]) {
                console.log("Node:", theNodesIds[i], "does not exist");
            }
        }
    }

    private resetValuesForConnectionCheck(): void {
        this._curExamNode = null;
        this._searchQueue = [];
        this.uncheckAllNodes();
        this.clearAllPahtsToThisNode();
    }

    private initializeCurExamNode(startNodeId: string): void {
        this._curExamNode = this.getNodeById(startNodeId);
        this._curExamNode.checkNode();
    }

    private updateCurExamNode(): void {
        // Array.shift() pops the item 0
        this._curExamNode = this._searchQueue.shift();
        this._curExamNode.checkNode();
    }

    private setPathToNodes(prevNode: Node, neighbours: Node[]) {
        for (let node of neighbours) {
            node.unshiftPathToThisNode(prevNode);
        }
    }

    private updateSearchQueue(): void {
        let nextNodes: Node[] = this.getNodesByIds(
            this._curExamNode.getNeighboursIds());
        this.setPathToNodes(this._curExamNode, nextNodes)
        this._searchQueue = this._searchQueue.concat(nextNodes);
        this._searchQueue = this.removeCheckedNodes(this._searchQueue);
    }

    private initializeSearchingForConnection(startNodeId: string): void {
        this.resetValuesForConnectionCheck();
        this.initializeCurExamNode(startNodeId);
        this.updateSearchQueue();
    }

    public getConnection(nodeAId: string, nodeBId: string): string[] {

        console.log(`\nTesting connection between ${nodeAId} and ${nodeBId}:`);

        let nodesExistence: boolean[] = this.nodesExist([nodeAId, nodeBId]);

        if (nodesExistence.some((existence) => { return !existence })) {
            this.declareNonExistingNodes([nodeAId, nodeBId], nodesExistence);
            return [];
        } else {
            this.initializeSearchingForConnection(nodeAId);
            while (this._searchQueue.length !== 0) {
                this.updateCurExamNode();
                if (this._curExamNode.getId() === nodeBId) {
                    this._curExamNode.addOwnIdToPathToThisNode();
                    console.log("Connection found");
                    return this._curExamNode.getPathToThisNode();
                } else {
                    this.updateSearchQueue();
                }
            }
            console.log("Connection not found");
            return [];
        }
    }


}

export default Graph;
